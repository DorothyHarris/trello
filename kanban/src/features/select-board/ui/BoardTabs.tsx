import { getErrorMessage } from "@/shared/api";
import {
  useBoardStore,
  selectBoards,
  selectCurrentBoardId,
  selectOpenBoard,
} from "@/entities/board";
import styles from "./BoardTabs.module.css";

export const BoardTabs = () => {
  const boards = useBoardStore(selectBoards);
  const currentBoardId = useBoardStore(selectCurrentBoardId);
  const openBoard = useBoardStore(selectOpenBoard);

  const handleClick = async (boardId: string) => {
    try {
      await openBoard(boardId);
    } catch (error) {
      console.error("Не удалось открыть доску:", getErrorMessage(error));
    }
  };

  return (
    <nav className={styles["board-tabs"]}>
      {boards.map((board) => {
        const className =
          board.id === currentBoardId
            ? `${styles["board-tabs__item"]} ${styles["board-tabs__item--active"]}`
            : styles["board-tabs__item"];

        return (
          <button
            key={board.id}
            type="button"
            className={className}
            onClick={() => handleClick(board.id)}
          >
            {board.title}
          </button>
        );
      })}
    </nav>
  );
};
