export interface IRekognitionService {
  verifyFace(imageBuffer: Buffer): Promise<boolean>;
}
