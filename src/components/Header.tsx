"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { HeaderContainer } from "@/ui/pages/dashboard";
import { PrimaryButton } from "@/ui/components/buttons";
import { Input } from "@/ui/components/inputs";
import { deleteCookie } from "@/lib/actions/cookies";
import { filterTasks } from "@/lib/features/board/slice";
import { useAppDispatch } from "@/lib/hooks";
import { SESSION_COOKIE } from "@/lib/constants";

export const Header = () => {
  const router = useRouter();
  const [filter, setFilter] = useState("");

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await deleteCookie(SESSION_COOKIE);
    router.push("/login");
  };

  const handleFilter = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(filterTasks(filter));
  };

  return (
    <HeaderContainer>
      <h1 style={{ margin: "0" }}>Bienvenido a tu tablero</h1>

      <form onSubmit={handleFilter}>
        <Input
          placeholder="Buscar..."
          onChange={e => setFilter(e.target.value)}
          value={filter}
        />
        <PrimaryButton type="submit">
          Buscar
        </PrimaryButton>
      </form>

      <PrimaryButton onClick={handleLogout}>
        Cerrar sesión
      </PrimaryButton>
    </HeaderContainer>
  );
};
