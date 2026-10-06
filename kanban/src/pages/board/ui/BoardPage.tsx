import { useEffect } from "react";
import { getErrorMessage } from "@/shared/api";
import { useBoardStore, selectFetchBoards } from "@/entities/board";
import { BoardTabs } from "@/features/select-board";
import { BoardWidget } from "@/widgets/board";

export const BoardPage = () => {
  const fetchBoards = useBoardStore(selectFetchBoards);

  useEffect(() => {
    fetchBoards().catch((error: unknown) => {
      console.error("Не удалось загрузить доски:", getErrorMessage(error));
    });
  }, [fetchBoards]);

  return (
    <>
      <BoardTabs />
      <BoardWidget />
    </>
  );
};
