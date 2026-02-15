import { StorageUploadResult } from "./storage.interface";

export interface ProcessedImageResult {
  storageResult: StorageUploadResult;
  cleanup: () => Promise<void>;
}

export interface IProfileImageService {
  /**
   * Process and upload a profile image with face verification and background removal
   */
  processAndUploadProfileImage(
    imageBuffer: Buffer,
    mimetype: string,
    userId: string,
  ): Promise<ProcessedImageResult>;

  /**
   * Upload an ID verification image without processing
   */
  uploadIdImage(
    imageBuffer: Buffer,
    mimetype: string,
    userId: string,
  ): Promise<ProcessedImageResult>;
}
