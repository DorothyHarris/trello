import type { ReactNode } from "react";
import styles from "./BoardView.module.css";

type Props = {
  children: ReactNode;
  title: string;
};

export const BoardView = ({ children, title }: Props) => {
  return (
    <div className={styles.view}>
      <h2 className={styles.view__title} title={title}>
        {title}
      </h2>
      <div className={styles.board}>{children}</div>
    </div>
  );
};
