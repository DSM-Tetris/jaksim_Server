import { User } from "../entity";
import { context } from "../context";

export class UserRepository {
  static async save({ username, password, email, nickname }: User) {
    await context.prisma.user.create({
      data: {
        username,
        password,
        email,
        nickname,
      },
    });
  }

  static findByUsername(username: string): Promise<User | null> {
    return context.prisma.user.findUnique({
      where: {
        username,
      },
    });
  }

  static findByEmail(email: string): Promise<User | null> {
    return context.prisma.user.findUnique({
      where: {
        email
      }
    });
  }

  static async modifyPasswordByEmail(
    email: string,
    password: string,
  ): Promise<void> {
    await context.prisma.user.update({
      where: {
        email,
      },
      data: {
        password,
      },
    });
  }
}
