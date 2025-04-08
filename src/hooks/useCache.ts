import { useAppSelector } from "@/lib/hooks";

export const useCache = () => {
  const board = useAppSelector((state) => state.board.value);
  const session = useAppSelector((state) => state.session.value)!;

  return { board, session };
};
