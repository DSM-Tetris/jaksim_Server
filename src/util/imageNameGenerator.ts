import { v4 as uuidV4 } from "uuid";
import moment from "moment";
import path from "path";

export class ImageNameGenerator {
  private static dateFormat = "YYMMDDHHmmss";

  static imageName(filename: string) {
    const uuid = uuidV4();
    const now = new Date();
    const ext = path.extname(filename);
    return moment(now).format(this.dateFormat) + uuid + ext;
  }
}
