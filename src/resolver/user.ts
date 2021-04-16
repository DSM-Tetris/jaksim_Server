import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  SignupRequest,
  SignupResult,
  SendEmailResult,
  LoginResult,
  LoginRequest,
} from "../dto";
import { UserService, EmailService } from "../service";
import { RefreshResult, RefreshRequest } from "../dto";

@Resolver(User)
export class UserResolver {
  @Query(() => User)
  async getUser() {}

  @Mutation(() => SignupResult)
  async signup(@Arg("data") data: SignupRequest): Promise<typeof SignupResult> {
    return await UserService.signup(data);
  }

  @Mutation(() => SendEmailResult)
  async sendVerificationEmail(
    @Arg("email") email: string
  ): Promise<typeof SendEmailResult> {
    return await EmailService.sendVerificationEmail(email);
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
