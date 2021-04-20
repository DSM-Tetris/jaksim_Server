import { ApolloError } from "apollo-server";
import config from "../config";
import { transporter } from "../config/email";
import {
  SendEmailResult,
  SendEmailResponse,
  VerifyEmailResult,
  VerifyEmailResponse,
} from "../dto";
import { generateEmailAuthKey, validateArguments } from "../util";
import { EmailRepository } from "../repository";
import { emailSchema } from "../schema";

export class EmailService {
  static async sendVerificationEmail(
    email: string
  ): Promise<typeof SendEmailResult> {
    const validateArgumentResult = await validateArguments(email, emailSchema);
    if (validateArgumentResult) {
      throw validateArgumentResult;
    }

    if (await this.sendMail(email)) {
      return new SendEmailResponse.SendEmailSuccess();
    }
    throw new ApolloError("Internal Server Error");
  }

  static async verifyAuthCode(
    email: string,
    authCode: string
  ): Promise<typeof VerifyEmailResult> {
    const storedAuthCode = await EmailRepository.findByEmail(email);
    if (authCode === storedAuthCode) {
      return new VerifyEmailResponse.VerifyEmailSuccess();
    } else {
      return new VerifyEmailResponse.VerifyEmailFailed();
    }
  }

  private static async sendMail(
    email: string,
  ): Promise<Boolean> {
    const authCode = generateEmailAuthKey();

    const sendResult = await transporter.sendMail({
      from: `"Jaksim" <${config.EMAIL}>`,
      to: `<${email}>`,
      subject: "Jaksim Email Auth",
      text: `Email 인증 코드 : ${authCode}`
    });

    transporter.close();
    await EmailRepository.saveEmailAuthKey(email, authCode);

    return sendResult.accepted.length > 0;
  }
}