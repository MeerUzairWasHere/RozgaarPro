import {
  RekognitionClient,
  DetectFacesCommand,
} from "@aws-sdk/client-rekognition";
import { BadRequestError } from "../errors";
import { IRekognitionService } from "../interfaces";

export class RekognitionService implements IRekognitionService {
  private client: RekognitionClient;

  constructor() {
    this.client = new RekognitionClient({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
      },
    });
  }

  async verifyFace(imageBuffer: Buffer) {
    const command = new DetectFacesCommand({
      Image: {
        Bytes: imageBuffer,
      },
      Attributes: ["ALL"],
    });

    const result = await this.client.send(command);

    if (!result.FaceDetails || result.FaceDetails.length === 0) {
      throw new BadRequestError(
        "No face detected. Please upload a clear photo.",
      );
    }

    const face = result.FaceDetails[0];

    // Confidence check
    if ((face.Confidence ?? 0) < 90) {
      throw new BadRequestError("Face not clear. Please retake the photo.");
    }

    // Blur check
    if ((face.Quality?.Sharpness ?? 0) < 50) {
      throw new BadRequestError("Image is too blurry. Please retake.");
    }

    // Brightness check
    if ((face.Quality?.Brightness ?? 0) < 30) {
      throw new BadRequestError("Image too dark. Improve lighting.");
    }

    return true;
  }
}
