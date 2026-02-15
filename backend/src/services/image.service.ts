// infrastructure/services/ImageService.ts
import axios from "axios";
import FormData from "form-data";
import { IImageService, ImageResult } from "../interfaces";

export class ImageService implements IImageService {
  constructor(private apiKey: string) {}

  async removeImageBackground(
    file: Buffer,
    mimeType: string,
  ): Promise<ImageResult> {
    const form = new FormData();

    form.append("image_file", file, {
      filename: "image.png",
      contentType: mimeType,
    });

    // free preview size
    form.append("size", "preview");

    const response = await axios.post(
      "https://api.remove.bg/v1.0/removebg",
      form,
      {
        headers: {
          ...form.getHeaders(),
          "X-Api-Key": this.apiKey,
        },
        responseType: "arraybuffer",
        maxBodyLength: Infinity,
        maxContentLength: Infinity,
      },
    );

    return {
      buffer: Buffer.from(response.data),
      mimeType: "image/png",
    };
  }
}
