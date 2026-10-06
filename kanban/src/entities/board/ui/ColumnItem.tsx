import type { Column } from "../model/type";

type Props = {
  column: Column;
};

export const ColumnItem = ({ column }: Props) => {
  return <div>{column.title}</div>;
};
