"use server";
import { supabase } from "@/lib/supabase/client";
import { Task } from "@/interfaces/types";

export const reorderTask = async (taskId: string, columnId: string, position: number) => {
  const { error } = await supabase
    .from("tasks")
    .update({ column_id: columnId, position })
    .eq("id", taskId);

  if (error) throw error;
};

export const addTask = async (task: string, columnId: string) => {
  const jsonTask = JSON.parse(task) as Task;

  const { data, error } = await supabase
    .from("tasks")
    .insert({ ...jsonTask, column_id: columnId })
    .select()
    .single();
  if (error) throw error;

  return data as Task;
};

export const deleteTask = async (taskId: string) => {
  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", taskId);
  if (error) throw error;
  return true;
};

export const updateTask = async (task: string) => {
  const jsonTask = JSON.parse(task) as Task;

  const { error } = await supabase
    .from("tasks")
    .update(jsonTask)
    .eq("id", jsonTask.id);

  if (error) throw error;
  return true;
};
