"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import { login } from "@/lib/services/session";
import { SESSION_COOKIE } from "@/lib/constants";
import { setCookie } from "@/lib/actions/cookies";
import { encryptSession } from "@/lib/actions/encrypt";
import { generateTOtp, generateSecretKey } from "@/lib/actions/totp";
import {
  LoginContainer,
  LoginForm,
  LoginTitle
} from "@/ui/pages/login";
import { Input } from "@/ui/components/inputs";
import { PrimaryButton } from "@/ui/components/buttons";
import { useError } from "@/hooks/useError";

const Login = () => {
  const router = useRouter();
  const setError = useError();

  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;
    setIsLoading(true);

    const secretKey = await generateSecretKey();
    const tOtp = await generateTOtp(secretKey);
    const token = await login(email, password, tOtp, secretKey);

    if (token) {
      const tokenEncrypted = await encryptSession(token, email);
      await setCookie(SESSION_COOKIE, tokenEncrypted);
      router.push("/dashboard");
      return;
    }

    setIsLoading(false);
    setError("USER_NOT_EXIST");
  };

  useEffect(() => {
    setIsFormValid(email.trim() !== "" && password.trim() !== "");
  }, [email, password]);

  return (
    <LoginContainer>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>Inicia sesión</LoginTitle>

        <Input
          type="email"
          name="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          name="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="on"
        />

        <PrimaryButton
          type="submit"
          disabled={!isFormValid || isLoading}
        >
          {isLoading ? "Cargando..." : "Iniciar sesión"}
        </PrimaryButton>
      </LoginForm>
    </LoginContainer>
  );
};

export default Login;
