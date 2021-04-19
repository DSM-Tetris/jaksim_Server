import { UploadPostRequest, UploadPostResult } from "../dto";
import { Upload } from "../types";
import {createWriteStream} from "fs";
import path from "path";

export class PostService {
  static async uploadPost(
    data: UploadPostRequest,
    file: Upload
  ): Promise<typeof UploadPostResult> {
    file.createReadStream().pipe(createWriteStream(path.join(__dirname, '../images', file.filename))
      .on('finish', () => {})
      .on('error', () => {});
    return null;
  }

  private static uploadImage(file: Upload): Promise<void> {
    return new Promise((resolve, reject) => {
      file.createReadStream()
        .pipe(createWriteStream(path.join(__dirname, '../images', file.filename)))
        .on('finish', () => resolve())
        .on('error', () => reject());
    });
  }
}
