import { TagRepository } from "../repository";

export class TagService {
  static async getPopularTags(ago: number) {
    const tags = await TagRepository.countTags(ago);
    tags.sort((a, b) => {
      return Number(b.count) - Number(a.count);
    });

    const popularTags: string[] = [];
    const take = tags.length < 10 ? tags.length : 10;

    for (let i = 0; i < take; i++) {
      popularTags.push(tags[i].tagName);
    }
    return popularTags;
  }
}