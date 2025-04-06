"use server";
import CryptoJS from "crypto-js";

import { SESSION_ENCRYPTION_KEY } from "../constants";

export const encryptToken = async (token: string) => {
  const encryptedToken = CryptoJS.AES.encrypt(token, SESSION_ENCRYPTION_KEY).toString();
  return encryptedToken;
};

export const decryptToken = async (encryptedToken: string) => {
  const bytes = CryptoJS.AES.decrypt(encryptedToken, SESSION_ENCRYPTION_KEY);
  const decryptedToken = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedToken;
};
