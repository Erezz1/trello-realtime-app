import styled from "styled-components";
import { DroppableProvided } from "@hello-pangea/dnd";

import { Column as ColumnType } from "@/interfaces/types";
import { Task } from "./Task";

interface ColumnProps {
  provided: DroppableProvided;
  column: ColumnType;
}

export const Column: React.FC<ColumnProps> = ({ provided, column }) => {
  return (
    <ColumnContainer
      {...provided.droppableProps}
      ref={provided.innerRef}
    >
      <ColumnTitle>{column.title}</ColumnTitle>
      {column.tasks.map((task, index) => (
        <Task task={task} index={index} key={task.id} />
      ))}
      {provided.placeholder}
    </ColumnContainer>
  );
};

const ColumnContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 8px;
  padding: 12px;
  width: 272px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  max-height: 100%;
`;

const ColumnTitle = styled.h2`
  font-size: 16px;
  font-weight: 600;
  margin-bottom: 12px;
`;
