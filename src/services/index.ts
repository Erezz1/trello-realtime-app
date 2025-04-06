"use server";
import { validateTOtp } from "@/lib/actions/totp";
import { SESSION_API_URL } from "@/lib/constants";
import { randomTime } from "@/lib/utils/randomTime";

export const login = async (
  email: string,
  password: string,
  tOtp: string,
  secretKey: string
) => {
  const time = randomTime(0, 5);

  const isValidateTOtp = await validateTOtp(tOtp, secretKey);
  if (!isValidateTOtp)
    return null;

  try {
    const res = await fetch(`${SESSION_API_URL}/api/login?delay=${time}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        email,
        password
      }),
      cache: "no-store"
    });

    const data = await res.json() as { token: string };
    return data.token ?? null;

  } catch (error) {
    console.log(error);
    return null;
  }
};
