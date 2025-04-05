import styled from "styled-components";
import { Draggable } from "@hello-pangea/dnd";
import { Task as TaskType } from "@/interfaces/types";

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

const TaskCard = styled.div`
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 1px 0 rgba(9, 30, 66, 0.25);
  padding: 12px;
  margin-bottom: 8px;
  cursor: pointer;
`;

const TaskTitle = styled.h3`
  font-size: 14px;
  font-weight: bold;
`;

const TaskDescription = styled.p`
  font-size: 12px;
  color: #5e6c84;
  margin-top: 4px;
`;

