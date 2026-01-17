import twilio from "twilio";
import { VerifyProvider } from "../interfaces";

export class TwilioVerifyService implements VerifyProvider {
  private client;

  constructor() {
    this.client = twilio(
      process.env.TWILIO_ACCOUNT_SID!,
      process.env.TWILIO_AUTH_TOKEN!,
    );
  }

  async sendOtp(
    to: string,
    channel: "sms" | "whatsapp" = "sms",
  ): Promise<void> {
    const formattedTo = this.normalizePhoneNumber(to);
    await this.client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verifications.create({
        to: formattedTo,
        channel,
      });
  }

  async checkOtp(to: string, code: string): Promise<boolean> {
    const formattedTo = this.normalizePhoneNumber(to);
    const result = await this.client.verify.v2
      .services(process.env.TWILIO_VERIFY_SERVICE_SID!)
      .verificationChecks.create({
        to: formattedTo,
        code,
      });

    return result.status === "approved";
  }

  normalizePhoneNumber(to: string): string {
    let phone = to.replace(/\D/g, "");

    if (!phone.startsWith("91")) {
      phone = `91${phone}`;
    }

    return `+${phone}`;
  }
}
