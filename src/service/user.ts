import {
  LoginRequest,
  SignupRequest,
  UserResponse,
  LoginResult,
  InvalidLoginInfo,
  Login,
} from "../dto";
import { UserRepository, TokenRepository } from "../repository";
import { UserInputError } from "apollo-server";
import { PasswordService } from "./password";
import { JwtGenerator, JwtPayload, JwtValidator } from "../util";
import {
  InvalidAccessToken,
  InvalidRefreshToken,
  Refresh,
  RefreshRequest,
  RefreshResult,
} from "../dto";

export class UserService {
  static async signup(data: SignupRequest): Promise<void> {
    const user = await UserRepository.findByUsername(data.username);
    if (user) {
      throw new UserInputError("User Already Exists", {
        status: 409,
      });
    }

    data.password = await PasswordService.encryptPassword(data.password);
    return UserRepository.save(data.toUserEntity());
  }

  static async getOneUser(username: string): Promise<UserResponse | null> {
    const user = await UserRepository.findByUsername(username);
    return user ? UserResponse.from(user) : null;
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
