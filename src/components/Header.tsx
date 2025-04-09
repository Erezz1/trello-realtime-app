"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { HeaderContainer } from "@/ui/pages/dashboard";
import { PrimaryButton } from "@/ui/components/buttons";
import { Input } from "@/ui/components/inputs";
import { deleteCookie } from "@/lib/actions/cookies";
import { setBoard } from "@/lib/features/board/slice";
import { useAppDispatch } from "@/lib/hooks";
import { SESSION_COOKIE } from "@/lib/constants";
import { getBoardFilteringTasksByTitle } from "@/lib/supabase/board";
import { useCache } from "@/hooks/useCache";

export const Header = () => {
  const router = useRouter();
  const { session } = useCache();

  const [filter, setFilter] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    await deleteCookie(SESSION_COOKIE);
    router.push("/login");
  };

  const handleFilter = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const data = await getBoardFilteringTasksByTitle(session.email, filter);
    setIsLoading(false);
    if (!data) return;

    dispatch(setBoard(data));
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
        <PrimaryButton
          type="submit"
          disabled={isLoading || filter.length < 2}
        >
          Buscar
        </PrimaryButton>
      </form>

      <PrimaryButton onClick={handleLogout}>
        Cerrar sesión
      </PrimaryButton>
    </HeaderContainer>
  );
};
