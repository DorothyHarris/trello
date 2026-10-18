import {
  useBoardStore,
  selectColumns,
  selectBoards,
  selectCurrentBoardId,
  ColumnItem,
  BoardView,
  selectDeleteBoard,
  selectPatchBoard,
} from "@/entities/board";
import { AddColumn } from "@/features/add-column";
import styles from "./BoardWidget.module.css";
import { getErrorMessage } from "@/shared/api";

export const BoardWidget = () => {
  const columns = useBoardStore(selectColumns);
  const boards = useBoardStore(selectBoards);
  const deleteBoard = useBoardStore(selectDeleteBoard);
  const patchBoardsName = useBoardStore(selectPatchBoard);
  const currentBoardId = useBoardStore(selectCurrentBoardId);
  const board = boards.find((item) => item.id === currentBoardId);

  // пока доска не выбрана, добавлять колонки некуда
  if (!board) {
    return <p className={styles.empty}>Создайте первую доску</p>;
  }

  const handleDelete = async () => {
    try {
      await deleteBoard(board.id);
    } catch (error) {
      console.error("Не удалось удалить доску:", getErrorMessage(error));
    }
  };

  const handlePatch = async (newTitle: string) => {
    try {
      await patchBoardsName(board.id, newTitle);
    } catch (error) {
      console.error("Не удалось переименовать доску:", getErrorMessage(error));
    }
  };

  return (
    <BoardView
      onDelete={handleDelete}
      onPatch={handlePatch}
      title={board.title}
    >
      {columns.map((column) => (
        <ColumnItem key={column.id} column={column} />
      ))}
      <AddColumn />
    </BoardView>
  );
};
