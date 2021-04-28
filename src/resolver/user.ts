import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../entity";
import {
  SignupRequest,
  SignupResult,
  SendEmailResult,
  LoginResult,
  LoginRequest,
  ModifyPasswordRequest,
  ModifyPasswordResult,
} from "../dto";
import { UserService, EmailService } from "../service";
import { RefreshResult, RefreshRequest } from "../dto";
import { Validate, ValidOf } from "../decorator/validateArguments";
import { loginSchema, signupSchema, emailSchema } from "../schema";

@Resolver(User)
export class UserResolver {
  @Validate
  @Mutation(() => SignupResult)
  async signup(
    @Arg("data") @ValidOf(signupSchema) data: SignupRequest
  ): Promise<typeof SignupResult> {
    return await UserService.signup(data);
  }

  @Validate
  @Mutation(() => SendEmailResult)
  async sendVerificationEmail(
    @Arg("email") @ValidOf(emailSchema) email: string
  ): Promise<typeof SendEmailResult> {
    return await EmailService.sendVerificationEmail(email);
  }

  @Validate
  @Mutation(() => LoginResult)
  async login(
    @Arg("data") @ValidOf(loginSchema) data: LoginRequest
  ): Promise<typeof LoginResult> {
    return await UserService.login(data);
  }

  @Mutation(() => RefreshResult)
  async regenerateAccessToken(
    @Arg("data") data: RefreshRequest
  ): Promise<typeof RefreshResult> {
    return await UserService.regenerateAccessToken(data);
  }

  @Validate
  @Mutation(() => ModifyPasswordResult)
  async modifyPassword(
    @Arg("data") data: ModifyPasswordRequest
  ) {
    return await UserService.modifyPassword(data);
  }
}
