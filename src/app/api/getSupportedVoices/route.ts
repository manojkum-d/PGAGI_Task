// app/api/getSupportedLanguages/route.ts
import { NextRequest, NextResponse } from "next/server";
import { fetcher } from "../../../lib/fetcher";

export async function GET(req: NextRequest) {
  const token = process.env.API_KEY;
  const url = "https://www.toingg.com/api/v3/get_supported_voices";

  try {
    const data = await fetcher(url, token as string);
    return NextResponse.json(data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
