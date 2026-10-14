import { BoardTabs } from "@/features/select-board";
import { AddBoard } from "@/features/add-board";
import styles from "./BoardSidebar.module.css";

export const BoardSidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <h2 className={styles.sidebar__title}>Доски</h2>
      <BoardTabs />
      <div className={styles.sidebar__footer}>
        <AddBoard />
      </div>
    </aside>
  );
};
