"use client";
import { useRouter } from "next/navigation";

import { HeaderContainer } from "@/ui/pages/dashboard";
import { deleteCookie } from "@/lib/actions/cookies";
import { SESSION_COOKIE } from "@/lib/constants";

export const Header = () => {
  const router = useRouter();

  const handleLogout = async () => {
    await deleteCookie(SESSION_COOKIE);
    router.push("/login");
  };

  return (
    <HeaderContainer>
      <h1 style={{ margin: "0" }}>Bienvenido a tu tablero</h1>
      <button onClick={handleLogout}>
        Cerrar sesión
      </button>
    </HeaderContainer>
  );
};
