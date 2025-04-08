import { DroppableProvided } from "@hello-pangea/dnd";

import { Column as ColumnType } from "@/interfaces/types";
import { ColumnContainer, ColumnTitle } from "@/ui/components/column";
import { Task } from "./Task";
import { AddTask } from "./AddTask";

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
      <AddTask column={column} />
      {column.tasks.map((task, index) => (
        <Task
          task={task}
          index={index}
          key={task.id}
          columnId={column.id}
        />
      ))}
      {provided.placeholder}
    </ColumnContainer>
  );
};
