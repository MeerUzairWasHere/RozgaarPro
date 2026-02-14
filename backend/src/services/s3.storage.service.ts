import {
  S3Client,
  PutObjectCommand,
  DeleteObjectCommand,
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

import { IStorageService, StorageUploadResult } from "../interfaces";

type BucketType = "public" | "private";

export class S3StorageService implements IStorageService {
  private s3 = new S3Client({
    region: process.env.AWS_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  private publicBucket = process.env.AWS_S3_PUBLIC_BUCKET!;
  private privateBucket = process.env.AWS_S3_PRIVATE_BUCKET!;

  private getBucket(type: BucketType) {
    return type === "public" ? this.publicBucket : this.privateBucket;
  }

  async upload(
    file: Buffer,
    key: string,
    mimeType: string,
    type: BucketType = "public",
  ): Promise<StorageUploadResult> {
    const bucket = this.getBucket(type);

    await this.s3.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: file,
        ContentType: mimeType,
      }),
    );

    return { key };
  }

  async delete(key: string, type: BucketType = "public"): Promise<void> {
    const bucket = this.getBucket(type);

    await this.s3.send(
      new DeleteObjectCommand({
        Bucket: bucket,
        Key: key,
      }),
    );
  }

  getPublicUrl(key: string): string {
    return `https://${this.publicBucket}.s3.amazonaws.com/${key}`;
  }

  async getSignedUrl(
    key: string,
    options?: { expiresInSeconds?: number },
  ): Promise<string> {
    const command = new GetObjectCommand({
      Bucket: this.privateBucket,
      Key: key,
    });

    return getSignedUrl(this.s3, command, {
      expiresIn: options?.expiresInSeconds ?? 60 * 5,
    });
  }
}
