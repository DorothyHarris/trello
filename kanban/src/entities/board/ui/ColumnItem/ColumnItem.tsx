import type { Column } from "../../model/type";
import styles from "./Column.module.css";

type Props = {
  column: Column;
};

export const ColumnItem = ({ column }: Props) => {
  return (
    <section className={styles.column}>
      <h3 className={styles.column__title} title={column.title}>
        {column.title}
      </h3>
    </section>
  );
};
