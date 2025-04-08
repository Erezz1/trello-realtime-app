import { useId, useState } from "react";

import { addTask } from "@/lib/supabase/tasks";
import { useAppDispatch } from "@/lib/hooks";
import { PrimaryButton } from "@/ui/components/buttons";
import { Input, TextArea } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

import { Column } from "@/interfaces/types";
import { addTask as addTaskAct } from "@/lib/features/board/slice";
import { useError } from "@/hooks/useError";
import { generateId } from "@/lib/utils/generateId";
import { useCache } from "@/hooks/useCache";

interface AddTaskProps {
  column: Column;
}

export const AddTask: React.FC<AddTaskProps> = ({ column }) => {
  const [ showAddInputTask, setShowAddInputTask ] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const id = useId();

  const { session: { email } } = useCache();
  const dispatch = useAppDispatch();
  const showError = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length < 5 || description.length < 10) {
      showError("INCORRECT_DATA");
      return;
    }

    const taskAlreadyExist = column.tasks.some((task) => task.title === title);
    if (taskAlreadyExist) {
      showError("TASK_EXIST");
      return;
    }
    setIsLoading(true);
    const generatedId = generateId(id, email);

    const stringTask = JSON.stringify({
      title,
      description,
      id: generatedId,
      position: column.tasks.length + 1
    });
    const addedTask = await addTask(stringTask, column.id);
    setIsLoading(false);

    if (!addedTask) {
      showError("SERVER_ERROR");
      return;
    }

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
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <TextArea
        placeholder="Descripcion"
        name="task-description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <PrimaryButton
        type="submit"
        disabled={isLoading || title.length < 5 || description.length < 10}
      >
        Agregar tarea
      </PrimaryButton>
    </FormContainer>
  );
};
