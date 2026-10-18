import { type ReactNode, useEffect, useState } from "react";
import styles from "./BoardView.module.css";

type Props = {
  children: ReactNode;
  title: string;
  onDelete?: () => void;
  onPatch?: (title: string) => void;
};

export const BoardView = ({ children, title, onDelete, onPatch }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(title);

  useEffect(() => {
    setValue(title);
  }, [title]);

  return (
    <div className={styles.view}>
      <div className={styles.view__header}>
        {isEditing ? (
          <input
            className={styles.view__title_input}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => {
              onPatch?.(value);
              setIsEditing(false);
            }}
            autoFocus
          />
        ) : (
          <h2
            className={styles.view__title}
            title="Дважды кликните, чтобы переименовать"
            onDoubleClick={() => setIsEditing(true)}
          >
            {title}
          </h2>
        )}
        <button
          type="button"
          className={styles.view__delete}
          onClick={onDelete}
          aria-label="Удалить доску"
        >
          ×
        </button>
      </div>
      <div className={styles.board}>{children}</div>
    </div>
  );
};
