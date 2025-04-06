"use client";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { setBoard } from "@/lib/features/board/slice";
import { BoardContainer } from "@/ui/components/board";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";

import { Column } from "./Column";
import { generateNewBoard } from "@/helpers/generateNewBoard";

export const Board = () => {
  const board = useAppSelector(({ board }) => board.value);
  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const newBoard = generateNewBoard(result, board);
    if (!newBoard) return;
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
