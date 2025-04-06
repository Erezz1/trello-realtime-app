import { useEffect } from "react";
import { supabase } from "@/lib/supabase/client";
import { useAppDispatch } from "@/lib/hooks"; // Asegúrate de que useAppSelector esté importado
import { setBoard } from "@/lib/features/board/slice";
import { getBoard } from "@/services/board";

export const useRealtimeBoard = (email: string) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    // Verifica si el canal ya existe
    const channel = supabase.channel(`realtime-board-${email}`);

    // Actualiza el board cuando haya un cambio en columnas o tareas
    const updateBoard = async () => {
      try {
        const newBoard = await getBoard(email);
        dispatch(setBoard(newBoard));
      } catch (error) {
        console.error("Error fetching board data:", error);
      }
    };

    // Se suscribe a los cambios en las tablas Column y Task
    channel
      .on("postgres_changes", { event: "*", schema: "public", table: "columns" }, updateBoard)
      .on("postgres_changes", { event: "*", schema: "public", table: "tasks" }, updateBoard)
      .subscribe();

    // Ejecuta updateBoard cuando el estado de board cambie
    updateBoard();

    // Limpiar el canal cuando el componente se desmonte
    return () => {
      supabase.removeChannel(channel);
    };
  }, [email, dispatch]);
};
