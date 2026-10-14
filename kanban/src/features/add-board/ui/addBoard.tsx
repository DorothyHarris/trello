import Button from "@/shared/ui/button/Button.tsx";
import { useBoardStore } from "@/entities/board";
import { selectCreateBoard } from "@/entities/board/model/selectors.ts";
import { getErrorMessage } from "@/shared/api";

export const AddBoard = () => {
  const createBoard = useBoardStore(selectCreateBoard);

  const handleClick = async () => {
    try {
      await createBoard("Новая доска");
    } catch (error) {
      console.error("Не удалось создать доску:", getErrorMessage(error));
    }
  };

  return <Button title="Новая доска" onClick={handleClick} full />;
};
