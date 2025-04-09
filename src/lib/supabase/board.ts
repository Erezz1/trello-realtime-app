"use server";
import { orderBoard } from "@/helpers/orderBoard";
import { Board } from "@/interfaces/types";
import { supabase } from "@/lib/supabase/client";

export const getBoard = async (email: string) => {
  const { data, error } = await supabase
    .from("boards")
    .select(`
      columns (
        id,
        title,
        position,
        tasks (
          id,
          title,
          description
        )
      )
    `)
    .eq("email", email)
    .single();

  if (error && error.code === "PGRST116") {
    const { error: insertError } = await supabase
      .from("boards")
      .insert({ email });

    if (insertError) throw insertError;
    return [];
  }

  if (error) throw error;
  return data?.columns as Board ?? [];
};

export const getBoardFilteringTasksByTitle = async (email: string, tasksTitle: string) => {
  const boardFound = await getBoard(email);

  if (!boardFound) return [];
  if (tasksTitle === "") return (boardFound ?? []);

  const orderedBoard = orderBoard(boardFound);
  const filteredBoard = orderedBoard.map((column) => {
    const filteredTasks = column.tasks.filter((task) => task.title.toLowerCase().includes(tasksTitle.toLowerCase()));
    return {
      ...column,
      tasks: filteredTasks,
    };
  });
  return filteredBoard;
};

export const updateBoard = async (board: Board, email: string) => {
  const boardPayload = {
    email,
    value: board,
  };
  const { error } = await await supabase.rpc("update_full_board", { board_json: boardPayload });

  if (error) throw error;
};
