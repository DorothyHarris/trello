import {
  useBoardStore,
  selectColumns,
  selectBoards,
  selectCurrentBoardId,
  ColumnItem,
  BoardView,
} from "@/entities/board";
import { AddColumn } from "@/features/add-column";
import styles from "./BoardWidget.module.css";

export const BoardWidget = () => {
  const columns = useBoardStore(selectColumns);
  const boards = useBoardStore(selectBoards);
  const currentBoardId = useBoardStore(selectCurrentBoardId);
  const board = boards.find((item) => item.id === currentBoardId);

  // пока доска не выбрана, добавлять колонки некуда
  if (!board) {
    return <p className={styles.empty}>Создайте первую доску</p>;
  }

  return (
    <BoardView title={board.title}>
      {columns.map((column) => (
        <ColumnItem key={column.id} column={column} />
      ))}
      <AddColumn />
    </BoardView>
  );
};
