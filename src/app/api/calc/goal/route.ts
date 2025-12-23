import type { NextRequest } from "next/server";
import { goalCalculator } from "@/server/services/goalCalculator";
import { validateGoalBody } from "@/server/utils/validation";
import { createErrorResponse } from "@/server/utils/error";

export const runtime = "nodejs";

export const POST = async (request: NextRequest) => {
  try {
    const json = await request.json();
    const body = validateGoalBody(json);

    if (!body) {
      return createErrorResponse(400, "BAD_REQUEST", "잘못된 요청 형식입니다.");
    }

    const result = goalCalculator(body);

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    });
  } catch (error) {
    return createErrorResponse(500, "INTERNAL_ERROR", "서버에서 오류가 발생했습니다.");
  }
};


