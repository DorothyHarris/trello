const BASE_URL = "/api";

export class ApiError extends Error {
  readonly status: number;
  readonly code: string;
  readonly data: unknown;

  constructor(status: number, code: string, message: string, data: unknown) {
    super(message);
    this.status = status;
    this.code = code;
    this.data = data;
  }
}

type ErrorBody = {
  code?: string;
  message?: string;
};

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return "Неизвестная ошибка";
};

type Method = "GET" | "POST" | "PATCH" | "DELETE";

async function request<T>(method: Method, url: string, body?: unknown): Promise<T> {
  const response = await fetch(BASE_URL + url, {
    method,
    headers: body !== undefined ? { "Content-Type": "application/json" } : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const data: ErrorBody | null = await response.json().catch(() => null);
    throw new ApiError(
      response.status,
      data?.code ?? "UNKNOWN",
      data?.message ?? response.statusText,
      data,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

export const api = {
  get: <T>(url: string) => request<T>("GET", url),
  post: <T>(url: string, body: unknown) => request<T>("POST", url, body),
  patch: <T>(url: string, body: unknown) => request<T>("PATCH", url, body),
  delete: (url: string) => request<void>("DELETE", url),
};
