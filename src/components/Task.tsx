import { Draggable } from "@hello-pangea/dnd";

import { Task as TaskType } from "@/interfaces/types";
import { TaskCard, TaskDescription, TaskTitle } from "@/ui/components/task";

interface TaskProps {
  task: TaskType;
  index: number;
}

export const Task: React.FC<TaskProps> = ({ task, index }) => {
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
        </TaskCard>
      )}
    </Draggable>
  );
};
