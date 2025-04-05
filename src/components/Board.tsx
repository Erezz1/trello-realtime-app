import { useState } from "react";
import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { Column } from "./Column";

const initialData = [
  {
    id: "column-1",
    title: "To Do",
    taskIds: [
      { id: "task-1", title: "Task 1", description: "Do something" },
      { id: "task-2", title: "Task 2", description: "Do something else" },
      { id: "task-4", title: "Task 4", description: "Do something else" },
      { id: "task-5", title: "Task 5", description: "Do something else" },
    ]
  },
  {
    id: "column-2",
    title: "In Progress",
    taskIds: [
      { id: "task-3", title: "Task 3", description: "Keep going" },
      { id: "task-6", title: "Task 6", description: "Do something else" }
    ]
  }
];

export const Board = () => {
  const [columns, setColumns] = useState(initialData);

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    const sourceColIndex = columns.findIndex(c => c.id === source.droppableId);
    const destColIndex = columns.findIndex(c => c.id === destination.droppableId);

    const sourceCol = columns[sourceColIndex];
    const destCol = columns[destColIndex];

    const [movedTask] = sourceCol.taskIds.splice(source.index, 1);

    if (sourceCol === destCol) {
      sourceCol.taskIds.splice(destination.index, 0, movedTask);
      const newCols = [...columns];
      newCols[sourceColIndex] = { ...sourceCol };
      setColumns(newCols);
    } else {
      destCol.taskIds.splice(destination.index, 0, movedTask);
      const newCols = [...columns];
      newCols[sourceColIndex] = { ...sourceCol };
      newCols[destColIndex] = { ...destCol };
      setColumns(newCols);
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {columns.map(column => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Column column={column} provided={provided}  />
            )}
          </Droppable>
        ))}
      </BoardContainer>
    </DragDropContext>
  );
};

const BoardContainer = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  overflow-x: auto;
  height: 100%;
  background-color: #f4f5f7;
  width: 100%;
`;
