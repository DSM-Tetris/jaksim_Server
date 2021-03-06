import { createWriteStream } from "fs";
import {
  UploadPostResponse,
  UploadPostRequest,
  UploadPostResult,
  GetPostsRequest,
  GetPostsResult,
  GetPostResult,
  GetPostsResponse,
  GetPostResponse,
  CategoryNotFound,
  BadRequest,
} from "../dto";
import { Upload } from "../type";
import path from "path";
import { ImageNameGenerator } from "../util";
import { context } from "../context";
import {
  PostRepository,
  TagRepository,
  LogRepository,
  CategoryRepository,
} from "../repository";
import { LogFactory, PostingLogFactory } from "../entity";

export class PostService {
  static async getPosts({
    page,
    categoryId,
  }: GetPostsRequest): Promise<typeof GetPostsResult> {
    const username = context.decoded["username"];

    const posts = await PostRepository.findTenByUsernameAndCategoryId(
      username,
      page,
      categoryId
    );
    const response: GetPostsResponse.PostPreview[] = [];

    for (const post of posts) {
      const tags = await TagRepository.findByPostId(post.id);
      response.push(
        new GetPostsResponse.PostPreview(
          post.id,
          post.title,
          post.content ? post.content.slice(0, 100) : null,
          post.image,
          tags
        )
      );
    }

    return posts.length
      ? new GetPostsResponse.GetPosts(response)
      : new GetPostsResponse.NotFoundAnyPost();
  }

  static async getPost(postId: number): Promise<typeof GetPostResult> {
    const username = context.decoded["username"];

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
    file: Upload | null
  ): Promise<typeof UploadPostResult> {
    const username = context.decoded["username"];

    if (data.categoryId) {
      const category = await CategoryRepository.findById(data.categoryId);
      if (!category || category?.username !== username) {
        return new CategoryNotFound();
      }
    }

    let imageName = "";

    if (file) {
      imageName = await this.uploadImage(file);
    }

    await this.savePostingLog(username);

    if (data.tagNames) {
      await PostRepository.saveWithTags(
        data.toPostEntity(username, imageName),
        data.tagNames
      );
    } else {
      await PostRepository.saveWithTags(data.toPostEntity(username, imageName));
    }
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
