import { useState } from "react";

import { PrimaryButton } from "@/ui/components/buttons";
import { ColumnContainer } from "@/ui/components/column";
import { Input } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

import { addColumn } from "@/lib/supabase/columns";
import { useAppDispatch } from "@/lib/hooks";
import { addColumn as addColumnAct } from "@/lib/features/board/slice";
import { useCache } from "@/hooks/useCache";
import { useError, ErrorMessage } from "@/hooks/useError";

export const AddColumn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");

  const { session, board } = useCache();
  const dispatch = useAppDispatch();
  const setError = useError();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (title.length < 5) {
      handleError("INCORRECT_DATA");
      return;
    }
    const boardAlreadyExists = board.find((col) => col.title === title);
    if (boardAlreadyExists) {
      handleError("COLUM_EXIST");
      return;
    }

    setIsLoading(true);
    const columnAdded = await addColumn(title, session.email);
    setIsLoading(false);

    if (!columnAdded) {
      handleError("SERVER_ERROR");
      return;
    };
    dispatch(addColumnAct(columnAdded));
    setTitle("");
  };

  const handleError = (error: ErrorMessage) => {
    setError(error);
    setIsLoading(false);
  };

  return (
    <ColumnContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre de la columna"
          name="column-title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <PrimaryButton
          type="submit"
          disabled={isLoading || title.length < 5}
        >
          Agregar columna
        </PrimaryButton>
      </FormContainer>
    </ColumnContainer>
  );
};
