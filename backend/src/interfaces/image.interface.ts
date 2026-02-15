export interface ImageResult {
  buffer: Buffer;
  mimeType: string;
}

export interface IImageService {
  removeImageBackground(file: Buffer, mimeType: string): Promise<ImageResult>;
}
