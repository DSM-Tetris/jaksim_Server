import { UploadPost, UploadPostRequest, UploadPostResult } from "../dto";
import { Upload } from "../type";
import { createWriteStream } from "fs";
import path from "path";
import {
  GetPostsRequest,
  GetPostsResult,
  GetPostRequest,
  GetPostResult,
  GetPostsResponse,
  GetPostResponse,
} from "../dto";
import { getPostsSchema, getPostSchema } from "../schema";
import { validateArguments } from "../util";
import { context } from "../context";
import { PostRepository, TagRepository } from "../repository";
import { ImageNameGenerator } from "../util/imageNameGenerator";
import { Log, LogFactory, PostingLogFactory } from "../entity";
import { LogRepository } from "../repository/log";

export class PostService {
  static async getPosts({ page, categoryId }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const username = context.decoded["username"];
    await validateArguments({ username, page, categoryId }, getPostsSchema);

    const posts = await PostRepository.findManyByUsername(username, page, categoryId);
    const response: GetPostsResponse.PostPreview[] = [];

    for (const post of posts) {
      const tags = await TagRepository.findByPostId(post.id);
      response.push(new GetPostsResponse.PostPreview(
        post.title,
        post.content ? post.content.slice(0, 100) : null,
        post.image,
        tags
      ));
    }

    return posts.length ? new GetPostsResponse.GetPosts(response) : new GetPostsResponse.NotFoundAnyPost();
  }

  static async getPost({ postId }: GetPostRequest): Promise<typeof GetPostResult> {
    const username = context.decoded["username"];

    await validateArguments({ postId }, getPostSchema);

    const post = await PostRepository.findOneByPostId(postId);
    if (!post) {
      return new GetPostResponse.NotFoundPost();
    }
    if (post.username !== username) {
      return new GetPostResponse.ForbiddenPost();
    }

    const tags = await TagRepository.findByPostId(postId);
    post.tags = tags;

    return new GetPostResponse.GetPost(post);
  }

  static async uploadPost(
    data: UploadPostRequest,
    file: Upload
  ): Promise<typeof UploadPostResult> {
    // TODO validate input values
    const username = context.decoded["username"];
    const imageName = await this.uploadImage(file);

    await this.savePostingLog(username);

    await PostRepository.save(data.toPostEntity(username, imageName));
    return new UploadPost();
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
