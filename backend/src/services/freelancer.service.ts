import { FreelancerProfileCompletedInput } from "../dto";
import {
  IFreelancerService,
  IPrismaService,
  IUserService,
} from "../interfaces";

export class FreelancerService implements IFreelancerService {
  constructor(
    private prismaService: IPrismaService,
    private userService: IUserService,
  ) {}

  async createAndCompleteFreelancerProfile({
    id,
    params,
  }: {
    id: string;
    params: FreelancerProfileCompletedInput;
  }) {
    const user = await this.userService.findUserByIdOrThrowError({ id });

    await this.prismaService.freelancer.create({
      data: {
        userId: id,
        experience: params.experience,
        phone: user.phone,
        locations: {
          create: {
            latitude: params.location.latitude,
            longitude: params.location.longitude,
            accuracy: params.location.accuracy,
          },
        },
        skills: {
          connect: params.skills.map((skill) => ({ id: skill })),
        },
      },
    });
  }
}
