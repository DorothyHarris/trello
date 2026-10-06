import { api } from "@/shared/api";
import type { Column, CreateColumnBody } from "../model/type";

export const createColumn = (boardId: string, body: CreateColumnBody) =>
  api.post<Column>(`/boards/${boardId}/columns`, body);
