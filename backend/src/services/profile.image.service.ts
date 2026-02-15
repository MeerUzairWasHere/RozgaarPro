// domain/services/ProfileImageService.ts
import {
  IImageService,
  IRekognitionService,
  IStorageService,
  IProfileImageService,
  ProcessedImageResult,
  BucketType,
} from "../interfaces";

export class ProfileImageService implements IProfileImageService {
  constructor(
    private rekognitionService: IRekognitionService,
    private imageService: IImageService,
    private storageService: IStorageService,
  ) {}

  async processAndUploadProfileImage(
    imageBuffer: Buffer,
    mimetype: string,
    userId: string,
  ): Promise<ProcessedImageResult> {
    // Verify face exists in image
    await this.rekognitionService.verifyFace(imageBuffer);

    // Remove background
    const processedImage = await this.imageService.removeImageBackground(
      imageBuffer,
      mimetype,
    );

    const extension = processedImage.mimeType.split("/")[1];
    const key = `profiles/${userId}-${Date.now()}.${extension}`;

    // Upload to storage
    const storageResult = await this.storageService.upload(
      processedImage.buffer,
      key,
      processedImage.mimeType,
      BucketType.PUBLIC,
    );

    // Return result with cleanup function
    return {
      storageResult,
      cleanup: async () => {
        await this.storageService.delete(storageResult.key, BucketType.PUBLIC);
      },
    };
  }

  async uploadIdImage(
    imageBuffer: Buffer,
    mimetype: string,
    userId: string,
  ): Promise<ProcessedImageResult> {
    const extension = mimetype.split("/")[1];
    const key = `ids/${userId}-${Date.now()}.${extension}`;

    const storageResult = await this.storageService.upload(
      imageBuffer,
      key,
      mimetype,
      BucketType.PRIVATE,
    );

    return {
      storageResult,
      cleanup: async () => {
        await this.storageService.delete(storageResult.key, BucketType.PRIVATE);
      },
    };
  }
}
