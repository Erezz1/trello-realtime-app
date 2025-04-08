"use client";
import { useEffect } from "react";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

import { setBoard } from "@/lib/features/board/slice";
import { useAppDispatch } from "@/lib/hooks";
import { useCache } from "@/hooks/useCache";
import { login } from "@/lib/features/session/slice";
import { updateBoard } from "@/lib/supabase/board";

import { BoardContainer } from "@/ui/components/board";
import { orderBoard } from "@/helpers/orderBoard";
import { generateNewBoard } from "@/helpers/generateNewBoard";
import { Column as ColumnType, Session } from "@/interfaces/types";
import { useWebsockets } from "@/hooks/useWebsockets";

import { Column } from "./Column";
import { AddColumn } from "./AddColumn";

interface BoardProps {
  board: ColumnType[];
  session: Session;
}

export const Board: React.FC<BoardProps> = (props) => {
  const { board } = useCache();
  useWebsockets(props.session.email);
  const dispatch = useAppDispatch();

  const onDragEnd = async (result: DropResult) => {
    const { source, destination } = result;
    if (!destination) return;

    const newBoard = generateNewBoard(result, board);
    if (!newBoard) return;

    const ordered = orderBoard(newBoard);
    dispatch(setBoard(ordered));

    const sourceCol = ordered.find(col => col.id === destination.droppableId);
    const destCol = ordered.find(col => col.id === destination.droppableId);

    if (!sourceCol || !destCol) return;

    const colsToUpdate =
      source.droppableId === destination.droppableId
        ? [sourceCol]
        : [sourceCol, destCol];

    updateBoard(colsToUpdate, props.session.email);
  };

  useEffect(() => {
    dispatch(setBoard(props.board));
    dispatch(login(props.session));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

        <AddColumn />
      </BoardContainer>
    </DragDropContext>
  );
};
