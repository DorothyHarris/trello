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

    const column = await columnApi.postColumn(boardId, { title });
    set((state) => ({ columns: [...state.columns, column] }));
  },

  postBoard: async (title) => {
    const board = await boardApi.postBoard({ title });
    set((state) => ({ boards: [...state.boards, board] }));
    await get().openBoard(board.id);
  },

  deleteBoard: async (boardId: string) => {
    await boardApi.deleteBoard(boardId);
    set((state) => ({
      boards: state.boards.filter((item) => item.id !== boardId),
    }));
    if (get().currentBoardId !== boardId) return;

    const first = get().boards[0];
    if (first) {
      await get().openBoard(first.id);
    } else {
      set({ currentBoardId: null, columns: [] });
    }
  },

  patchBoardName: async (boardId: string, title: string) => {
    const updated = await boardApi.patchBoardName(boardId, { title });
    set((state) => ({
      boards: state.boards.map((item) =>
        item.id === boardId ? updated : item,
      ),
    }));
  },
}));
