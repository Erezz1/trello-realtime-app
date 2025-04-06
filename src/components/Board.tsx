"use client";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { setBoard } from "@/lib/features/board/slice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { BoardContainer } from "@/ui/components/board";
import { generateNewBoard } from "@/helpers/generateNewBoard";
import { Column as ColumnType, Session } from "@/interfaces/types";

import { Column } from "./Column";
import { useEffect } from "react";
import { login } from "@/lib/features/session/slice";

interface BoardProps {
  board: ColumnType[];
  session: Session;
}

export const Board: React.FC<BoardProps> = (props) => {
  const board = useAppSelector(({ board }) => board.value);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const newBoard = generateNewBoard(result, board);
    if (!newBoard) return;
    dispatch(setBoard(newBoard));
  };

  useEffect(() => {
    dispatch(setBoard(props.board));
    login(props.session);
  }, []);

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
