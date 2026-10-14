import { useEffect } from "react";
import { getErrorMessage } from "@/shared/api";
import { useBoardStore, selectFetchBoards } from "@/entities/board";
import { BoardSidebar } from "@/widgets/board-sidebar";
import styles from "./BoardPage.module.css";
import { BoardWidget } from "@/widgets/board";

export const BoardPage = () => {
  const fetchBoards = useBoardStore(selectFetchBoards);

  useEffect(() => {
    fetchBoards().catch((error: unknown) => {
      console.error("Не удалось загрузить доски:", getErrorMessage(error));
    });
  }, [fetchBoards]);

  return (
    <div className={styles.page}>
      <BoardSidebar />
      <BoardWidget />
    </div>
  );
};
