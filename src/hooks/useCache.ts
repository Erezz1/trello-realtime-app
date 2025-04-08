import { useEffect, useRef } from "react";
import { useAppSelector } from "@/lib/hooks";
import { setCacheBoard } from "@/lib/supabase/board";

export const useCache = () => {
  const board = useAppSelector((state) => state.board.value);
  const session = useAppSelector((state) => state.session.value)!;

  const lastSavedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!session?.email) return;

    const serialized = JSON.stringify(board);
    if (lastSavedRef.current === serialized) return;

    setCacheBoard(session.email, board)
      .then(() => {
        lastSavedRef.current = serialized;
      })
      .catch((err) => {
        console.error("Error al setear cache:", err);
      });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return { board, session };
};
