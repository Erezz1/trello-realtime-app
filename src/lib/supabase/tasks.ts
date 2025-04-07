"use server";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/interfaces/types";

export const updateTask = async (taskId: string, columnId: string, position: number) => {
  const { error } = await supabase
    .from("tasks")
    .update({ column_id: columnId, position })
    .eq("id", taskId);

  if (error) throw error;
};

export const addTask = async (title: string, description: string, columnId: string, position: number) => {
  const { data, error } = await supabase
    .from("tasks")
    .insert({ title, description, column_id: columnId, position })
    .select()
    .single();
  if (error) throw error;

  return {
    id: data.id,
    title,
    description
  } as Task;
};
