// import "reflect-metadata";
// import { PasswordService, UserService } from "../../src/service";
// import {
//   LogRepository,
//   TokenRepository,
//   UserRepository,
// } from "../../src/repository";
// import { JwtGenerator } from "../../src/util";
// import { LoginResponse } from "../../src/dto";

// describe("user service test", () => {
//   test("login success", async () => {
//     const dto = { username: "dkssud9556", password: "@Passw0rd" };

//     UserRepository.findByUsername = jest.fn().mockResolvedValue({
//       username: "dkssud9556",
//       password: "@Passw0rd",
//       nickname: "testuser",
//       email: "test@test.com",
//     });
//     JwtGenerator.accessToken = jest.fn().mockReturnValue("access-token");
//     JwtGenerator.refreshToken = jest.fn().mockReturnValue("refresh-token");
//     TokenRepository.saveRefreshToken = jest.fn().mockResolvedValue(null);
//     LogRepository.save = jest.fn().mockResolvedValue(null);
//     PasswordService.match = jest.fn().mockResolvedValue(true);

//     const result = await UserService.login(dto);
//     expect(result).toBeInstanceOf(LoginResponse.Login);
//   });
// });
