
import { PrimaryButton } from "@/ui/components/buttons";
import { ColumnContainer } from "@/ui/components/column";
import { Input } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

import { addColumn } from "@/lib/supabase/columns";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { addColumn as addColumnAct } from "@/lib/features/board/slice";

export const AddColumn = () => {
  const session = useAppSelector(state => state.session.value)!;
  const dispatch = useAppDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("column-title") as string;
    if (!title) return;

    const columnAdded = await addColumn(title, session?.email);
    if (!columnAdded) return;

    dispatch(addColumnAct(columnAdded));
  };

  return (
    <ColumnContainer>
      <FormContainer onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Nombre de la columna"
          name="column-title"
          required
        />
        <PrimaryButton type="submit">
            Agregar columna
        </PrimaryButton>
      </FormContainer>
    </ColumnContainer>
  );
};
