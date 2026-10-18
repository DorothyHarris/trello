import type { BoardStore } from "./type";

export const selectBoards = (state: BoardStore) => state.boards;
export const selectCurrentBoardId = (state: BoardStore) => state.currentBoardId;
export const selectColumns = (state: BoardStore) => state.columns;

export const selectFetchBoards = (state: BoardStore) => state.fetchBoards;
export const selectOpenBoard = (state: BoardStore) => state.openBoard;
export const selectCreateColumn = (state: BoardStore) => state.createColumn;

export const selectCreateBoard = (state: BoardStore) => state.postBoard;
export const selectDeleteBoard = (state: BoardStore) => state.deleteBoard;
export const selectPatchBoard = (state: BoardStore) => state.patchBoardName;
