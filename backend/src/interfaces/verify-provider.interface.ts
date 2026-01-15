export interface VerifyProvider {
  sendOtp(to: string, channel?: "sms" | "whatsapp"): Promise<void>;
  checkOtp(to: string, code: string): Promise<boolean>;
}
