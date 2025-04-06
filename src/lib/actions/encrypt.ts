"use server";
import CryptoJS from "crypto-js";

import { SESSION_ENCRYPTION_KEY } from "../constants";
import { Session } from "@/interfaces/types";

export const encryptSession = async (token: string, email: string) => {
  const session: Session = { token, email };
  const encryptedToken = CryptoJS.AES.encrypt(JSON.stringify(session), SESSION_ENCRYPTION_KEY).toString();
  return encryptedToken;
};

export const decryptSession = async (encryptedToken: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SESSION_ENCRYPTION_KEY);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};
