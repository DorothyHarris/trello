import { api } from "@/shared/api";
import type { Board, BoardSummary, CreateBoardBody } from "../model/type";

export const getBoards = () => api.get<BoardSummary[]>("/boards");

export const getBoard = (boardId: string) =>
  api.get<Board>(`/boards/${boardId}`);

export const postBoard = (title: CreateBoardBody) =>
  api.post<BoardSummary>("/boards", title);

export const deleteBoard = (boardId: string) =>
  api.delete(`/boards/${boardId}`);

export const patchBoardName = (boardId: string, title: CreateBoardBody) =>
  api.patch<BoardSummary>(`/boards/${boardId}`, title);
