import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Task } from "@/interfaces/types";
import { ModalContainer, ModalWrapper } from "@/ui/components/modal";
import { PrimaryButton, SecondaryButton } from "@/ui/components/buttons";
import { Input, TextArea } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";
import { updateTask } from "@/lib/supabase/tasks";
import { updateTask as updateTaskAtc } from "@/lib/features/board/slice";
import { useError } from "@/hooks/useError";
import { useCache } from "@/hooks/useCache";
import { deleteCacheBoard } from "@/lib/supabase/board";

interface UpdateTaskProps {
  task: Task;
  columnId: string;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateTask: React.FC<UpdateTaskProps> = ({ task, columnId, setShowModal }) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [isLoading, setIsLoading] = useState(false);

  const { session } = useCache();

  const setError = useError();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle === task.title && newDescription === task.description)
      return;
    setIsLoading(true);

    const stringTask = JSON.stringify({
      ...task,
      title: newTitle,
      description: newDescription,
    });
    const wasUpdated = await updateTask(stringTask);

    setIsLoading(false);
    if (!wasUpdated) {
      setError("SERVER_ERROR");
      return;
    }

    updateTaskAtc({
      columnId,
      task: {
        ...task,
        title: newTitle,
        description: newDescription,
      }
    });
    deleteCacheBoard(session.email);
    setShowModal(false);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    createPortal(
      <ModalWrapper>
        <ModalContainer>
          <FormContainer onSubmit={handleSubmit}>
            <Input
              value={newTitle}
              style={{ fontSize: "1rem" }}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            <TextArea
              value={newDescription}
              style={{ fontSize: "1rem", height: "100px" }}
              onChange={(e) => setNewDescription(e.target.value)}
            />

            <div>
              <PrimaryButton
                type="submit"
                disabled={isLoading}
              >
                Guardar Tarea
              </PrimaryButton>
              <SecondaryButton
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancelar
              </SecondaryButton>
            </div>
          </FormContainer>
        </ModalContainer>
      </ModalWrapper>,
      document.body
    )
  );
};

