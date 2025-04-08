import { useId, useState } from "react";

import { addTask } from "@/lib/supabase/tasks";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { PrimaryButton } from "@/ui/components/buttons";
import { Input, TextArea } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

import { Column } from "@/interfaces/types";
import { addTask as addTaskAct } from "@/lib/features/board/slice";
import { useError } from "@/hooks/useError";
import { generateId } from "@/lib/utils/generateId";

interface AddTaskProps {
  column: Column;
}

export const AddTask: React.FC<AddTaskProps> = ({ column }) => {
  const [ showAddInputTask, setShowAddInputTask ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const id = useId();

  const { email } = useAppSelector(state => state.session.value)!;
  const dispatch = useAppDispatch();
  const showError = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("task-title") as string;
    const description = formData.get("task-description") as string;

    if (!title || !description) return;

    const taskAlreadyExist = column.tasks.some((task) => task.title === title);
    if (taskAlreadyExist) {
      showError("TASK_EXIST");
      return;
    }
    setIsLoading(true);
    const generatedId = generateId(id, email);

    const addedTask = await addTask({
      title,
      description,
      id: generatedId,
      position: column.tasks.length + 1
    }, column.id);

    setIsLoading(false);
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
      <TextArea
        placeholder="Descripcion"
        name="task-description"
        required
      />
      <PrimaryButton
        type="submit"
        disabled={isLoading}
      >
        Agregar tarea
      </PrimaryButton>
    </FormContainer>
  );
};
