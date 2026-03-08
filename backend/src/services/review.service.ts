import {
  CanRateFreelancerDto,
  CreateReviewInput,
  CreateReviewResponseDto,
  ListReviewsInput,
  ReviewDto,
} from "../dto/review.dto";
import { BadRequestError, NotFoundError } from "../errors";
import { IPrismaService, IReviewService, IStorageService } from "../interfaces";
import { PaginatedResponse } from "../types";

export class ReviewService implements IReviewService {
  constructor(
    private prismaService: IPrismaService,
    private storageService: IStorageService,
  ) {}

  private async getFreelancerOrThrow(freelancerId: string) {
    const freelancer = await this.prismaService.freelancer.findUnique({
      where: { id: freelancerId },
      select: { id: true, userId: true },
    });

    if (!freelancer) {
      throw new NotFoundError(`Freelancer with id ${freelancerId} not found`);
    }

    return freelancer;
  }

  async canRateFreelancer(
    userId: string,
    freelancerId: string,
  ): Promise<CanRateFreelancerDto> {
    const freelancer = await this.getFreelancerOrThrow(freelancerId);

    const [review, conversation] = await Promise.all([
      this.prismaService.review.findUnique({
        where: { userId_freelancerId: { userId, freelancerId } },
        select: { id: true },
      }),
      this.prismaService.conversation.findUnique({
        where: { userId_freelancerId: { userId, freelancerId } },
        select: { id: true },
      }),
    ]);

    const hasReviewed = Boolean(review);

    if (hasReviewed) {
      return {
        canRate: false,
        hasReviewed,
        reason: "You have already reviewed this freelancer.",
      };
    }

    if (!conversation) {
      return {
        canRate: false,
        hasReviewed,
        reason: "Start a chat with this freelancer first.",
      };
    }

    const freelancerReplyCount = await this.prismaService.message.count({
      where: {
        conversationId: conversation.id,
        senderUserId: freelancer.userId,
      },
    });

    if (freelancerReplyCount === 0) {
      return {
        canRate: false,
        hasReviewed,
        reason: "You can review this freelancer only after they reply in chat.",
      };
    }

    return {
      canRate: true,
      hasReviewed,
      reason: null,
    };
  }

  async createReview(
    userId: string,
    payload: CreateReviewInput,
  ): Promise<CreateReviewResponseDto> {
    await this.getFreelancerOrThrow(payload.freelancerId);

    const canRateResult = await this.canRateFreelancer(userId, payload.freelancerId);

    if (!canRateResult.canRate) {
      throw new BadRequestError(canRateResult.reason ?? "You cannot review this freelancer.");
    }

    const createdReview = await this.prismaService.$transaction(async (tx) => {
      const review = await tx.review.create({
        data: {
          userId,
          freelancerId: payload.freelancerId,
          rating: payload.rating,
          comment: payload.comment,
        },
      });

      const reviewStats = await tx.review.aggregate({
        where: { freelancerId: payload.freelancerId },
        _avg: { rating: true },
      });

      await tx.freelancer.update({
        where: { id: payload.freelancerId },
        data: { rating: reviewStats._avg.rating ?? 0 },
      });

      return review;
    });

    return {
      id: createdReview.id,
      freelancerId: createdReview.freelancerId,
      rating: createdReview.rating,
      comment: createdReview.comment,
      createdAt: createdReview.createdAt,
    };
  }

  async listFreelancerReviews(
    freelancerId: string,
    query: ListReviewsInput,
  ): Promise<PaginatedResponse<ReviewDto>> {
    await this.getFreelancerOrThrow(freelancerId);

    const page = query.pagination?.page ?? 1;
    const pageSize = query.pagination?.pageSize ?? 10;
    const skip = (page - 1) * pageSize;

    const [reviews, totalItems] = await Promise.all([
      this.prismaService.review.findMany({
        where: { freelancerId },
        orderBy: { createdAt: "desc" },
        skip,
        take: pageSize,
        select: {
          id: true,
          userId: true,
          freelancerId: true,
          rating: true,
          comment: true,
          createdAt: true,
          user: {
            select: {
              name: true,
              profileImage: true,
            },
          },
        },
      }),
      this.prismaService.review.count({
        where: { freelancerId },
      }),
    ]);

    const data: ReviewDto[] = reviews.map((item) => ({
      id: item.id,
      user_id: item.userId,
      reviewer_name: item.user.name,
      reviewer_profile_image_key: item.user.profileImage,
      reviewer_profile_image_url: item.user.profileImage
        ? this.storageService.getPublicUrl(item.user.profileImage)
        : null,
      freelancer_id: item.freelancerId,
      rating: item.rating,
      comment: item.comment,
      created_at: item.createdAt,
    }));

    const totalPages = Math.ceil(totalItems / pageSize);

    return {
      data,
      meta: {
        page,
        pageSize,
        totalItems,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1,
      },
    };
  }
}
