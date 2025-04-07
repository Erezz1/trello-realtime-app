import { DropResult } from "@hello-pangea/dnd";

import { Board } from "@/interfaces/types";

export const generateNewBoard = (dropResult: DropResult, board: Board) => {
  const { source, destination } = dropResult;
  if (!destination) return;

  const sourceColIndex = board.findIndex(c => c.id === source.droppableId);
  const destColIndex = board.findIndex(c => c.id === destination.droppableId);

  const sourceCol = board[sourceColIndex];
  const destCol = board[destColIndex];

  const sourceTasks = [...sourceCol.tasks];
  const destTasks = sourceCol === destCol ? sourceTasks : [...destCol.tasks];

  const [movedTask] = sourceTasks.splice(source.index, 1);
  destTasks.splice(destination.index, 0, movedTask);

  // Reasignar posiciones secuenciales en ambas columnas
  const updatedSourceCol = {
    ...sourceCol,
    tasks: sourceCol.id === destCol.id
      ? destTasks.map((task, index) => ({ ...task, position: index + 1 }))
      : sourceTasks.map((task, index) => ({ ...task, position: index + 1 })),
  };

  const updatedDestCol = sourceCol.id === destCol.id
    ? updatedSourceCol
    : {
      ...destCol,
      tasks: destTasks.map((task, index) => ({ ...task, position: index + 1 })),
    };

  const newBoard = [...board];
  newBoard[sourceColIndex] = updatedSourceCol;
  if (sourceCol.id !== destCol.id) {
    newBoard[destColIndex] = updatedDestCol;
  }

  return newBoard;
};
