import { useState } from "react";
import { Draggable } from "@hello-pangea/dnd";
import Swal from "sweetalert2";

import { Task as TaskType } from "@/interfaces/types";
import {
  TaskCard,
  TaskDescription,
  TaskTitle,
  TaskActions
} from "@/ui/components/task";
import { removeTask } from "@/lib/features/board/slice";
import { useAppDispatch } from "@/lib/hooks";
import { deleteTask } from "@/lib/supabase/tasks";
import { LinkButton } from "@/ui/components/buttons";
import { UpdateTask } from "./UpdateTask";

interface TaskProps {
  task: TaskType;
  index: number;
  columnId: string;
}

export const Task: React.FC<TaskProps> = ({ task, index, columnId }) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const dispatch = useAppDispatch();

  const handleUpdate = () => {
    setShowUpdateModal(true);
  };

  const handleDelete = async () => {
    const accept = await Swal.fire({
      title: "Estas seguro?",
      text: "Se eliminira la tarjeta definitivamente!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#000000",
      confirmButtonText: "Si, eliminar!",
      cancelButtonText: "Cancelar",
    });
    if (!accept.isConfirmed) return;

    const wasDeleted = await deleteTask(task.id);
    if (!wasDeleted) return;

    dispatch(removeTask({ taskId: task.id, columnId }));
    Swal.fire({
      title: "Eliminado!",
      text: "La tarjeta ha sido eliminada.",
      icon: "success",
      confirmButtonColor: "#000000",
    });
  };

  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <TaskCard
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <TaskTitle>{task.title}</TaskTitle>
          <TaskDescription>{task.description}</TaskDescription>

          <TaskActions>
            <LinkButton
              style={{ "color": "oklch(0.488 0.243 264.376)" }}
              onClick={handleUpdate}
            >
              UPDATE
            </LinkButton>
            <LinkButton
              onClick={handleDelete}
              style={{ "color": "oklch(0.637 0.237 25.331)" }}
            >
              DELETE
            </LinkButton>
          </TaskActions>

          <UpdateTask
            task={task}
            columnId={columnId}
            showModal={showUpdateModal}
            setShowModal={setShowUpdateModal}
          />
        </TaskCard>
      )}
    </Draggable>
  );
};
