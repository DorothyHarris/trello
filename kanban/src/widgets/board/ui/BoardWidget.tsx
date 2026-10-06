import { useBoardStore, selectColumns, ColumnItem } from "@/entities/board";
import { AddColumn } from "@/features/add-column";

export const BoardWidget = () => {
  const columns = useBoardStore(selectColumns);

  return (
    <div>
      {columns.map((column) => (
        <ColumnItem key={column.id} column={column} />
      ))}
      <AddColumn />
    </div>
  );
};
