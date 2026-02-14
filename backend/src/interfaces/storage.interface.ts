export enum BucketType {
  PUBLIC = "public",
  PRIVATE = "private",
}

export interface StorageUploadResult {
  key: string;
}

export interface SignedUrlOptions {
  expiresInSeconds?: number;
}

export interface IStorageService {
  upload(
    file: Buffer,
    path: string,
    mimeType: string,
    type: BucketType,
  ): Promise<StorageUploadResult>;

  delete(key: string, type: BucketType): Promise<void>;

  getPublicUrl(key: string): string;

  getSignedUrl(key: string, options?: SignedUrlOptions): Promise<string>;
}
