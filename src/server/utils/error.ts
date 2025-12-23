export type ApiErrorCode =
  | "BAD_REQUEST"
  | "INTERNAL_ERROR";

export type ApiError = {
  code: ApiErrorCode;
  message: string;
};

export const createErrorResponse = (status: number, code: ApiErrorCode, message: string) => {
  const body: { error: ApiError } = {
    error: {
      code,
      message,
    },
  };

  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
};


