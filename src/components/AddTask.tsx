
import { PrimaryButton } from "@/ui/components/buttons";
import { Input } from "@/ui/components/inputs";
import { FormContainer } from "@/ui/components/form";

export const AddTask = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const title = formData.get("title") as string;
    if (!title) return;

    // TODO: Add task to board
  };

  return (
    <FormContainer style={{ marginBottom: "30px" }} onSubmit={handleSubmit}>
      <Input
        type="text"
        placeholder="Nombre de la tarea"
        name="task-title"
        required
      />
      <PrimaryButton type="submit">
        Agregar tarea
      </PrimaryButton>
    </FormContainer>
  );
};
