import { useEffect } from "react";

import { useAppSelector } from "@/lib/hooks";
import { setCacheBoard } from "@/lib/supabase/board";

export const useCache = () => {
  const board = useAppSelector((state) => state.board.value);
  const session = useAppSelector((state) => state.session.value);

  useEffect(() => {
    if (!session?.email) return;
    setCacheBoard(session.email, board);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [board]);

  return board;
};
