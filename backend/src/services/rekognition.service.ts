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
      Image: { Bytes: imageBuffer },
      Attributes: ["ALL"],
    });

    const result = await this.client.send(command);

    if (!result.FaceDetails || result.FaceDetails.length !== 1) {
      throw new BadRequestError("Please upload a photo with exactly one face.");
    }

    const face = result.FaceDetails[0];

    if ((face.Confidence ?? 0) < 90) {
      throw new BadRequestError("Face not clear. Please retake.");
    }

    if ((face.Quality?.Sharpness ?? 0) < 60) {
      console.log(face.Quality?.Sharpness);
      throw new BadRequestError("Image is too blurry.");
    }

    if ((face.Quality?.Brightness ?? 0) < 40) {
      throw new BadRequestError("Image too dark.");
    }

    if (face.FaceOccluded?.Value) {
      throw new BadRequestError("Face is partially covered.");
    }

    if (!face.EyesOpen?.Value || (face.EyesOpen?.Confidence ?? 0) < 80) {
      throw new BadRequestError("Please keep your eyes open.");
    }

    const box = face.BoundingBox;

    if (!box || box.Width == null || box.Height == null) {
      throw new BadRequestError(
        "Face detection failed. Please retake the photo.",
      );
    }

    if (box.Width < 0.25 || box.Height < 0.25) {
      throw new BadRequestError("Face is too far from the camera.");
    }

    const pose = face.Pose;
    if (
      Math.abs(pose?.Yaw ?? 0) > 20 ||
      Math.abs(pose?.Pitch ?? 0) > 20 ||
      Math.abs(pose?.Roll ?? 0) > 20
    ) {
      throw new BadRequestError("Please face the camera directly.");
    }

    return true;
  }
}
