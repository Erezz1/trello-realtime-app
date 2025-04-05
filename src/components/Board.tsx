import styled from "styled-components";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";
import { useSelector, useDispatch } from "react-redux";

import { Column } from "./Column";
import type { RootState } from "@/lib/store";
import { setBoard } from "@/lib/features/board/boardSlice";

export const Board = () => {
  const board = useSelector((state: RootState) => state.board.value);
  const dispatch = useDispatch();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
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

    dispatch(setBoard(newBoard));
  };  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {board.map(column => (
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
