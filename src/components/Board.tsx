"use client";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { setBoard } from "@/lib/features/board/slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { login } from "@/lib/features/session/slice";
import { updateTask } from "@/lib/supabase/tasks";

import { BoardContainer } from "@/ui/components/board";
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
    dispatch(setBoard(newBoard));

    const movedTask = board
      .find(col => col.id === result.source.droppableId)
      ?.tasks[result.source.index];

    if (!movedTask || !result.destination) return;

    try {
      await updateTask(movedTask.id, result.destination.droppableId);
    } catch (error) {
      console.error("Error actualizando la tarea en Supabase", error);
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
