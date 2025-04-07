import { Board } from "@/interfaces/types";

export const orderBoard = (board: Board) => {
  const orderColumns = board.sort(
    (a, b) => a.position - b.position
  );

  const orderedBoard = orderColumns.map((column) => ({
    ...column,
    tasks: column.tasks.sort((a, b) => a.position - b.position),
  }));

  return setPositions(orderedBoard);
};

const setPositions = (board: Board) => {
  const boardUpdated = board.map((column, index) => ({
    ...column,
    position: index + 1,
    tasks: column.tasks.map((task, index) => ({
      ...task,
      position: index + 1,
    })),
  }));
  return boardUpdated;
};
