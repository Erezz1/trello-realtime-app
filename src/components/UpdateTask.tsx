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

interface UpdateTaskProps {
  task: Task;
  columnId: string;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const UpdateTask: React.FC<UpdateTaskProps> = ({ task, columnId, showModal, setShowModal }) => {
  const [newTitle, setNewTitle] = useState(task.title);
  const [newDescription, setNewDescription] = useState(task.description);
  const [prevTask] = useState(task);
  const [disableBtn, setDisableBtn] = useState(true);

  const { board } = useCache();
  const setError = useError();

  const handleClose = () => {
    setShowModal(false);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newTitle === task.title && newDescription === task.description) {
      setError("TASK_EXIST");
      return;
    }

    const foundCol = board.find(col => col.id === columnId);
    if (!foundCol) {
      setError("COLUM_NOT_EXIST");
      return;
    }
    const alreadyExists = foundCol.tasks.some(
      t => t.title === newTitle && t.id !== task.id
    );
    if (alreadyExists) {
      setError("TASK_EXIST");
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
    setShowModal(false);

    const stringTask = JSON.stringify({
      ...task,
      title: newTitle,
      description: newDescription,
    });
    const wasUpdated = await updateTask(stringTask);
    if (wasUpdated) return;

    updateTaskAtc({
      columnId,
      task: prevTask
    });
  };

  useEffect(() => {
    if (showModal) {
      document.body.style.overflow = "hidden";
      return;
    }
    document.body.style.overflow = "auto";
  }, [showModal]);

  useEffect(() => {
    if (newTitle === task.title && newDescription === task.description) {
      setDisableBtn(true);
      return;
    }
    if (newTitle.trim().length < 5 || newDescription.trim().length < 10) {
      setDisableBtn(true);
      return;
    }
    setDisableBtn(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newTitle, newDescription]);

  if (!showModal) {
    return null;
  }

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
                disabled={disableBtn}
              >
                Guardar Tarea
              </PrimaryButton>
              <SecondaryButton onClick={handleClose}>
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
