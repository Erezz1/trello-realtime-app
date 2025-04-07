"use client";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { setBoard } from "@/lib/features/board/slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login } from "@/lib/features/session/slice";
import { updateTask } from "@/lib/supabase/tasks";

import { BoardContainer } from "@/ui/components/board";
import { orderBoard } from "@/helpers/orderBoard";
import { generateNewBoard } from "@/helpers/generateNewBoard";
import { Column as ColumnType, Session } from "@/interfaces/types";
import { useRealtimeBoard } from "@/hooks/useRealtimeBoard";

import { Column } from "./Column";

interface BoardProps {
  board: ColumnType[];
  session: Session;
}

export const Board: React.FC<BoardProps> = (props) => {
  const board = useAppSelector(({ board }) => board.value);
  const dispatch = useAppDispatch();

  const onDragEnd = async (result: DropResult) => {
    const newBoard = generateNewBoard(result, board);
    if (!newBoard) return;
  
    const ordered = orderBoard(newBoard); 
    dispatch(setBoard(ordered));
  
    const { source, destination } = result;
    if (!destination) return;
  
    // Encontrar columnas afectadas
    const sourceCol = ordered.find(c => c.id === source.droppableId);
    const destCol = ordered.find(c => c.id === destination.droppableId);
  
    if (!sourceCol || !destCol) return;
  
    // Unificar columnas a actualizar
    const colsToUpdate = source.droppableId === destination.droppableId
      ? [sourceCol]
      : [sourceCol, destCol];
  
    try {
      const updates = colsToUpdate.flatMap(column =>
        column.tasks.map(task =>
          updateTask(task.id, column.id, task.position)
        )
      );
    
      await Promise.all(updates);
    } catch (error) {
      console.error("Error actualizando posiciones en Supabase", error);
    }
  };

  useEffect(() => {
    dispatch(setBoard(props.board));
    login(props.session);
  }, []);
  useRealtimeBoard(props.session.email);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <BoardContainer>
        {board.map(column => (
          <Droppable droppableId={column.id} key={column.id}>
            {(provided) => (
              <Column column={column} provided={provided} />
            )}
          </Droppable>
        ))}
      </BoardContainer>
    </DragDropContext>
  );
};
