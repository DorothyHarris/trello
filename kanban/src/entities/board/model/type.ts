export type Card = {
  id: string;
  columnId: string;
  title: string;
  description: string;
  dueDate: string | null;
  tags: string[];
  position: number;
  version: number;
  createdAt: string;
  updatedAt: string;
};

export type Column = {
  id: string;
  boardId: string;
  title: string;
  position: number;
  version: number;
};

export type BoardSummary = {
  id: string;
  title: string;
};

export type Board = BoardSummary & {
  columns: Column[];
  cards: Card[];
};

export type CreateColumnBody = {
  title: string;
};

export type BoardState = {
  boards: BoardSummary[];
  currentBoardId: string | null;
  columns: Column[];
};

export type BoardActions = {
  fetchBoards: () => Promise<void>;
  openBoard: (boardId: string) => Promise<void>;
  createColumn: (title: string) => Promise<void>;
};

export type BoardStore = BoardState & BoardActions;
