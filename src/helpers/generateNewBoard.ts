import { DropResult } from "@hello-pangea/dnd";

import { Board } from "@/interfaces/types";

export const generateNewBoard = (dropResult: DropResult, board: Board) => {
  const { source, destination } = dropResult;
  if (!destination) return;

  const sourceColIndex = board.findIndex(c => c.id === source.droppableId);
  const destColIndex = board.findIndex(c => c.id === destination.droppableId);

  const sourceCol = board[sourceColIndex];
  const destCol = board[destColIndex];

  // Crear copias profundas de las listas de tareas
  const sourceTasks = [...sourceCol.tasks];
  const destTasks = sourceCol === destCol ? sourceTasks : [...destCol.tasks];

  // Remover la tarea movida
  const [movedTask] = sourceTasks.splice(source.index, 1);

  // Insertar en nueva posición
  destTasks.splice(destination.index, 0, movedTask);

  // Crear nuevas columnas
  const newSourceCol = {
    ...sourceCol,
    tasks: sourceTasks,
  };

  const newDestCol = sourceCol === destCol
    ? newSourceCol
    : {
      ...destCol,
      tasks: destTasks,
    };

  // Construir nuevo board
  const newBoard = [...board];
  newBoard[sourceColIndex] = newSourceCol;
  if (sourceCol !== destCol) {
    newBoard[destColIndex] = newDestCol;
  }

  return newBoard;
};
