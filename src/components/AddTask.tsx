import { useState } from "react";

import { addTask } from "@/lib/supabase/tasks";
import { useAppDispatch } from "@/lib/hooks";
import { PrimaryButton } from "@/ui/components/buttons";
import { Input } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

import { Column } from "@/interfaces/types";
import { addTask as addTaskAct } from "@/lib/features/board/slice";

interface AddTaskProps {
  column: Column;
}

export const AddTask: React.FC<AddTaskProps> = ({ column }) => {
  const dispatch = useAppDispatch();
  const [ showAddInputTask, setShowAddInputTask ] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("task-title") as string;
    const description = formData.get("task-description") as string;

    if (!title || !description) return;

    const addedTask = await addTask(
      title,
      description,
      column.id,
      column.tasks.length + 1
    );
    if (!addedTask) return;

    dispatch(
      addTaskAct({
        columnId: column.id,
        task: addedTask
      })
    );
    setShowAddInputTask(false);
  };

  if (!showAddInputTask) {   
    return (
      <PrimaryButton
        style={{ marginBottom: "30px" }}
        type="submit"
        onClick={() => setShowAddInputTask(true)}
      >
        Agregar tarea
      </PrimaryButton>
    );
  }

  return (
    <FormContainer
      style={{
        marginBottom: "30px",
        padding: "10px",
        borderRadius: "10px",
        backgroundColor: "white",
      }}
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Nombre de la tarea"
        name="task-title"
        required
      />
      <Input
        type="text"
        placeholder="Descripcion"
        name="task-description"
        required
      />
      <PrimaryButton type="submit">
        Agregar tarea
      </PrimaryButton>
    </FormContainer>
  );
};
