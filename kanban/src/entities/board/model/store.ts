import { create } from "zustand";
import * as boardApi from "../api/boardApi";
import * as columnApi from "../api/columnApi";
import type { BoardStore } from "./type";

export const useBoardStore = create<BoardStore>((set, get) => ({
  boards: [],
  currentBoardId: null,
  columns: [],

  fetchBoards: async () => {
    const boards = await boardApi.getBoards();
    set({ boards });

    const first = boards[0];
    if (get().currentBoardId === null && first) {
      await get().openBoard(first.id);
    }
  },

  openBoard: async (boardId) => {
    set({ currentBoardId: boardId, columns: [] });
    const board = await boardApi.getBoard(boardId);

    if (get().currentBoardId !== boardId) return;
    set({ columns: board.columns });
  },

  createColumn: async (title) => {
    const boardId = get().currentBoardId;
    if (boardId === null) throw new Error("Доска не выбрана");

    const column = await columnApi.createColumn(boardId, { title });
    set((state) => ({ columns: [...state.columns, column] }));
  },
}));
