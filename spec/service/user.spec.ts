import "reflect-metadata";
import { PasswordService, UserService } from "../../src/service";
import {
  LogRepository,
  TokenRepository,
  UserRepository,
} from "../../src/repository";
import { JwtGenerator } from "../../src/util";
import { LoginResponse } from "../../src/dto";

describe("user service test", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("login success", async () => {
    const dto = { username: "dkssud9556", password: "@Passw0rd" };

    UserRepository.findByUsername = jest.fn().mockResolvedValue({
      username: "dkssud9556",
      password: "@Passw0rd",
      nickname: "testuser",
      email: "test@test.com",
    });
    JwtGenerator.accessToken = jest.fn().mockReturnValue("access-token");
    JwtGenerator.refreshToken = jest.fn().mockReturnValue("refresh-token");
    TokenRepository.saveRefreshToken = jest.fn().mockResolvedValue(null);
    LogRepository.save = jest.fn().mockResolvedValue(null);
    PasswordService.match = jest.fn().mockResolvedValue(true);

    UserService.login(dto)
      .then((result) => expect(result).toBeInstanceOf(LoginResponse.Login))
      .catch((err) => fail(err));
  });

  test("login fail - wrong username", async () => {
    const dto = { username: "wronguser123", password: "@Passw0rd" };

    UserRepository.findByUsername = jest.fn().mockResolvedValue(null);

    UserService.login(dto)
      .then((result) =>
        expect(result).toBeInstanceOf(LoginResponse.InvalidLoginInfo)
      )
      .catch((err) => fail(err));
  });

  test("login fail - wrong password", async () => {
    const dto = { username: "dkssud9556", password: "@Password1" };

    UserRepository.findByUsername = jest.fn().mockResolvedValue({
      username: "dkssud9556",
      password: "@Passw0rd",
      nickname: "testuser",
      email: "test@test.com",
    });
    PasswordService.match = jest.fn().mockResolvedValue(false);

    UserService.login(dto)
      .then((result) => {
        expect(result).toBeInstanceOf(LoginResponse.InvalidLoginInfo);
      })
      .catch((err) => fail(err));
  });
});
