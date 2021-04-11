import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  HttpResponse,
  LoginRequest,
  LoginResult,
  SignupRequest,
  UserResponse,
  SendEmailRequest,
} from "../dto";
import { UserService, EmailService } from "../service";
import { RefreshResult, RefreshRequest } from "../dto";

@Resolver(User)
export class UserResolver {
  @Mutation(() => HttpResponse)
  async signup(@Arg("data") data: SignupRequest): Promise<HttpResponse> {
    await UserService.signup(data);
    return {
      message: "User Created",
      status: 201,
    };
  }

  @Query(() => UserResponse, { nullable: true })
  async getOneUser(
    @Arg("username") username: string
  ): Promise<UserResponse | null> {
    return await UserService.getOneUser(username);
  }

  @Query(() => HttpResponse)
  async verifyEmail(
    @Arg("data") data: SendEmailRequest
  ): Promise<HttpResponse> {
    return await EmailService.sendVerificationEmail(data);
  }

  @Mutation(() => LoginResult)
  async login(@Arg("data") data: LoginRequest): Promise<typeof LoginResult> {
    return await UserService.login(data);
  }

  @Mutation(() => RefreshResult)
  async regenerateAccessToken(
    @Arg("data") data: RefreshRequest
  ): Promise<typeof RefreshResult> {
    return await UserService.regenerateAccessToken(data);
  }
}
