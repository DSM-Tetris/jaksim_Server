import {
  LoginResponse,
  RefreshResponse,
  SignupResult,
  SignupResponse,
  VerifyEmailResponse,
  LoginRequest,
  SignupRequest,
  LoginResult,
  RefreshResult,
  RefreshRequest,
  ModifyPasswordRequest,
  ModifyPasswordResponse,
  ModifyPasswordResult,
} from "../dto";
import { TokenRepository, UserRepository, LogRepository } from "../repository";
import { PasswordService } from "./password";
import {
  JwtGenerator,
  JwtPayload,
  JwtValidator,
} from "../util";
import { LogFactory, LoginLogFactory } from "../entity";
import { EmailService } from "./email";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResult> {
    const user = await UserRepository.findByEmail(data.email);
    if (user) {
      return new SignupResponse.AlreadyUserExists();
    }

    const verifyResult = await EmailService.verifyAuthCode(
      data.email,
      data.authCode
    );
    if (verifyResult instanceof VerifyEmailResponse.VerifyEmailFailed) {
      return verifyResult;
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SignupResponse.SuccessSignup();
  }

  static async login({ username, password }: LoginRequest
  ): Promise<typeof LoginResult> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      return new LoginResponse.InvalidLoginInfo();
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      return new LoginResponse.InvalidLoginInfo();
    }

    const accessToken = JwtGenerator.accessToken({ username });
    const refreshToken = JwtGenerator.refreshToken();
    await TokenRepository.saveRefreshToken(username, refreshToken);

    const logFactory: LogFactory = new LoginLogFactory();
    const log = logFactory.create(user.username);
    await LogRepository.save(log);

    return new LoginResponse.Login(accessToken, refreshToken);
  }

  static async regenerateAccessToken({
    accessToken,
    refreshToken,
  }: RefreshRequest): Promise<typeof RefreshResult> {
    const decodedAccessToken = JwtValidator.decode(accessToken);
    if (!decodedAccessToken) {
      return new RefreshResponse.InvalidRefreshToken();
    }

    const storedRefreshToken = await TokenRepository.findByUsername(
      (decodedAccessToken as JwtPayload).username
    );
    if (storedRefreshToken !== refreshToken) {
      return new RefreshResponse.InvalidRefreshToken();
    }

    const decodedRefreshToken = JwtValidator.verify(refreshToken);
    if (!decodedRefreshToken) {
      return new RefreshResponse.InvalidRefreshToken();
    }

    const regeneratedAccessToken = JwtGenerator.accessToken(
      decodedAccessToken as JwtPayload
    );
    return new RefreshResponse.Refresh(regeneratedAccessToken);
  }

  static async modifyPassword({
    email,
    newPassword,
    authCode,
  }: ModifyPasswordRequest): Promise<typeof ModifyPasswordResult> {
    const user = await UserRepository.findByEmail(email);
    if (!user) {
      return new ModifyPasswordResponse.UserNotExists();
    }
    const verifyResult = await EmailService.verifyAuthCode(
      email,
      authCode
    );
    if (verifyResult instanceof VerifyEmailResponse.VerifyEmailFailed) {
      return verifyResult;
    }

    newPassword = await PasswordService.encryptPassword(newPassword);
    await UserRepository.modifyPasswordByEmail(email, newPassword);
    return new ModifyPasswordResponse.ModifyPassword();
  }
}
