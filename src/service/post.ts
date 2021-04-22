import {
  UploadPostResponse,
  UploadPostRequest,
  UploadPostResult,
  GetPostsRequest,
  GetPostsResult,
  PostPreview,
  GetPosts,
  NotFoundPost,
} from "../dto";
import { Upload } from "../type";
import { createWriteStream } from "fs";
import path from "path";
import { getPostsSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository, LogRepository } from "../repository";
import { ImageNameGenerator } from "../util/imageNameGenerator";
import { LogFactory, PostingLogFactory } from "../entity";

export class PostService {
  static async getPosts({
    page,
  }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const username = context.decoded["username"];

    const validateArgumentResult = await validateArguments(
      { username, page },
      getPostsSchema
    );
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    const posts = await PostRepository.findManyByUsername(username, page);
    const response: PostPreview[] = [];

    for (const post of posts) {
      const tags = await TagRepository.findByPostId(post.id);
      response.push(
        new PostPreview(
          post.title,
          post.content ? post.content.slice(0, 100) : null,
          post.image,
          tags
        )
      );
    }

    return posts.length ? new GetPosts(response) : new NotFoundPost();
  }

  static async uploadPost(
    data: UploadPostRequest,
    file: Upload
  ): Promise<typeof UploadPostResult> {
    const username = context.decoded["username"];
    const imageName = await this.uploadImage(file);

    await this.savePostingLog(username);

    await PostRepository.save(data.toPostEntity(username, imageName));
    return new UploadPostResponse.UploadPost();
  }

  private static async savePostingLog(username: string) {
    const logFactory: LogFactory = new PostingLogFactory();
    const postingLog = logFactory.create(username);
    await LogRepository.save(postingLog);
  }

  private static uploadImage(file: Upload): Promise<string> {
    return new Promise((resolve, reject) => {
      const imageName = ImageNameGenerator.imageName(file.filename);
      file
        .createReadStream()
        .pipe(createWriteStream(path.join(__dirname, "../images", imageName)))
        .on("finish", () => resolve(imageName))
        .on("error", (err) => reject(err));
    });
  }
}
