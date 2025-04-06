import { DroppableProvided } from "@hello-pangea/dnd";

import { Column as ColumnType } from "@/interfaces/types";
import { Task } from "./Task";
import { ColumnContainer, ColumnTitle } from "@/ui/components/column";

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
