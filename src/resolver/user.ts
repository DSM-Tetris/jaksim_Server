import { Arg, Mutation, Resolver } from "type-graphql";
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
import { Validate, ValidOf } from "../decorator/validateArguments";
import { loginSchema, signupSchema, emailSchema } from "../schema";

@Resolver(User)
export class UserResolver {
  @Validate
  @Mutation(() => SignupResult)
  signup(
    @Arg("data") @ValidOf(signupSchema) data: SignupRequest
  ): Promise<typeof SignupResult> {
    return UserService.signup(data);
  }

  @Validate
  @Mutation(() => SendEmailResult)
  sendVerificationEmail(
    @Arg("email") @ValidOf(emailSchema) email: string
  ): Promise<typeof SendEmailResult> {
    return EmailService.sendVerificationEmail(email);
  }

  @Validate
  @Mutation(() => LoginResult)
  login(
    @Arg("data") @ValidOf(loginSchema) data: LoginRequest
  ): Promise<typeof LoginResult> {
    return UserService.login(data);
  }

  @Mutation(() => RefreshResult)
  regenerateAccessToken(
    @Arg("data") data: RefreshRequest
  ): Promise<typeof RefreshResult> {
    return UserService.regenerateAccessToken(data);
  }
}
