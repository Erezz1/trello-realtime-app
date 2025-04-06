"use server";
import { authenticator } from "otplib";

export const generateSecretKey = async () => {
  const userSecretKey = authenticator.generateSecret();
  return userSecretKey;
};

export const generateTOtp = async (secretKey: string) => {
  const tOtp = authenticator.generate(secretKey);
  return tOtp;
};

export const validateTOtp = async (tOtp: string, secretKey: string) => {
  return authenticator.verify({ token: tOtp, secret: secretKey });
};
