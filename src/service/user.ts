import {
  InvalidAccessToken,
  InvalidLoginInfo,
  InvalidRefreshToken,
  Login,
  SignupResult,
  SuccessSignup,
  AlreadyUserExists,
  VerifyEmailFailed,
  LoginRequest,
  SignupRequest,
  UserResponse,
  LoginResult,
  InvalidLoginInfo,
  Login,
} from "../dto";
import { TokenRepository, UserRepository } from "../repository";
import { PasswordService } from "./password";
import { JwtGenerator, JwtPayload, JwtValidator } from "../util";
import { LogRepository } from "../repository/log";
import { Log, LogFactory, LoginLogFactory } from "../entity";
import { EmailService } from "./email";
import { JwtGenerator, validateArguments } from "../util";
import { signupSchema } from "../schema";

export class UserService {
  static async signup(data: SignupRequest): Promise<typeof SignupResult> {
    const validateArgumentsResult = await validateArguments(data, signupSchema);
    if (validateArgumentsResult) {
      throw validateArgumentsResult;
    }

    const user = await UserRepository.findByEmail(data.email);
    if (user) {
      return new AlreadyUserExists();
    }
    
    const verifyResult = await EmailService.verifyAuthCode(data.email, data.authCode);
    if (verifyResult instanceof VerifyEmailFailed) {
      return verifyResult;
    }

    data.password = await PasswordService.encryptPassword(data.password);
    await UserRepository.save(data.toUserEntity());

    return new SuccessSignup();
  }

  static async login({
    username,
    password,
  }: LoginRequest): Promise<typeof LoginResult> {
    const user = await UserRepository.findByUsername(username);
    if (!user) {
      return new InvalidLoginInfo();
    }

    const isPasswordMatched = await PasswordService.match(
      password,
      user.password
    );
    if (!isPasswordMatched) {
      return new InvalidLoginInfo();
    }

    const accessToken = JwtGenerator.accessToken({ username });
    const refreshToken = JwtGenerator.refreshToken();
    await TokenRepository.saveRefreshToken(username, refreshToken);

    const logFactory: LogFactory = new LoginLogFactory();
    const log = logFactory.create(user);
    await LogRepository.save(log);

    return new Login(accessToken, refreshToken);
  }

  static async regenerateAccessToken({
    accessToken,
    refreshToken,
  }: RefreshRequest): Promise<typeof RefreshResult> {
    const decodedAccessToken = JwtValidator.decode(accessToken);
    if (!decodedAccessToken) {
      return new InvalidAccessToken();
    }

    const storedRefreshToken = await TokenRepository.findByUsername(
      (decodedAccessToken as JwtPayload).username
    );
    if (storedRefreshToken !== refreshToken) {
      return new InvalidRefreshToken();
    }

    const decodedRefreshToken = JwtValidator.verify(refreshToken);
    if (!decodedRefreshToken) {
      return new InvalidRefreshToken();
    }

    const regeneratedAccessToken = JwtGenerator.accessToken(
      decodedAccessToken as JwtPayload
    );
    return new Refresh(regeneratedAccessToken);
  }
}
