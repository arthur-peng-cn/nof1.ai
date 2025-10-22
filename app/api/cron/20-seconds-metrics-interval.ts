import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { getAccountInformationAndPerformance } from "@/lib/trading/account-information-and-performance";
import { prisma } from "@/lib/prisma";
import { ModelType } from "@prisma/client";
import { InputJsonValue, JsonValue } from "@prisma/client/runtime/library";

export const GET = async (request: NextRequest) => {
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

  let existMetrics = await prisma.metrics.findFirst({
    where: {
      model: ModelType.Deepseek,
    },
  });

  if (!existMetrics) {
    existMetrics = await prisma.metrics.create({
      data: {
        name: "20-seconds-metrics",
        metrics: [],
        model: ModelType.Deepseek,
      },
    });
  }

  const metrics = [
    ...((existMetrics?.metrics || []) as JsonValue[]),
    accountInformationAndPerformance,
  ] as JsonValue[];

  await prisma.metrics.update({
    where: {
      id: existMetrics?.id,
    },
    data: {
      metrics: metrics as InputJsonValue[],
    },
  });

  return new Response("Process executed successfully");
};
