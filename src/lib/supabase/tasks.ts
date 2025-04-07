"use server";
import { supabase } from "@/lib/supabase/client";

export const updateTask = async (taskId: string, columnId: string, position: number) => {
  const { error } = await supabase
    .from("tasks")
    .update({ column_id: columnId, position })
    .eq("id", taskId);

  if (error) throw error;
};
