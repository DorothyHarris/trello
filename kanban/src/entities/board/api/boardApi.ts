import { api } from "@/shared/api";
import type { Board, BoardSummary } from "../model/type";

export const getBoards = () => api.get<BoardSummary[]>("/boards");

export const getBoard = (boardId: string) => api.get<Board>(`/boards/${boardId}`);
