import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAppDispatch } from "@/lib/hooks";
import { setBoard } from "@/lib/features/board/slice";

import { orderBoard } from "@/helpers/orderBoard";
import { getBoard, getCacheBoard } from "@/lib/supabase/board";

export const useWebsockets = (email: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const channel = supabase.channel(`realtime-board-${email}`);

    const updateBoard = async () => {
      let newBoard;
      try {
        newBoard = await getCacheBoard(email);
        if (!newBoard)
          newBoard = await getBoard(email);

        const ordered = orderBoard(newBoard);
        dispatch(setBoard(ordered));
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    channel
      .on("postgres_changes", { event: "*", schema: "public", table: "cache" }, updateBoard)
      .subscribe();

    updateBoard();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [email, dispatch]);
};
