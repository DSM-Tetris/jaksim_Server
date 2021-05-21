import "reflect-metadata";
import { PasswordService } from "../../src/service";

describe("password service test", () => {
  describe("encrypt password method", () => {
    test("success encryption", async () => {
      const rawPassword = "PASSWORD";
      const encryptedPassword = await PasswordService.encryptPassword(
        rawPassword
      );

      expect(encryptedPassword).not.toBe(rawPassword);
    });
  });
});
