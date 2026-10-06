import Button from "@/shared/ui/button/Button";
import { getErrorMessage } from "@/shared/api";
import { useBoardStore, selectCreateColumn } from "@/entities/board";

export const AddColumn = () => {
  const createColumn = useBoardStore(selectCreateColumn);

  const handleClick = async () => {
    try {
      await createColumn("Новая колонка");
    } catch (error) {
      console.error("Не удалось создать колонку:", getErrorMessage(error));
    }
  };

  return <Button title="Добавить колонку" onClick={handleClick} full />;
};
