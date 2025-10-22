import { run } from "@/lib/ai/run";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getAccountInformationAndPerformance } from "@/lib/trading/account-information-and-performance";

export const GET = async (request: NextRequest) => {
  // Extract token from query parameters
  const url = new URL(request.url);
  const token = url.searchParams.get("token");

  if (!token) {
    return new Response("Token is required", { status: 400 });
  }

  try {
    jwt.verify(token, process.env.CRON_SECRET_KEY || "");
  } catch (error) {
    return new Response("Invalid token", { status: 401 });
  }

  const accountInformationAndPerformance =
    await getAccountInformationAndPerformance(
      Number(process.env.INITIAL_CAPITAL)
    );

  return new Response("Process executed successfully");
};
