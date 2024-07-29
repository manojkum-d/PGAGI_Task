import { NextResponse } from "next/server";
import { getfetcher } from "../../../lib/fetcher";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(request: Request) {
  const token = process.env.API_KEY!;

  if (!token) {
    console.error("API_KEY is missing");
    return NextResponse.json({ error: "API_KEY is missing" }, { status: 500 });
  }

  const url = `https://www.toingg.com/api/v3/get_campaigns`;

  try {
    console.log(`Fetching data from ${url}`);
    const data = await getfetcher(url, token);
    console.log(`Received data from API:`, data);

    // Ensure the data is in the correct format
    if (typeof data !== "object" || data === null) {
      throw new Error("Invalid data format received from external API");
    }

    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Detailed error in API route:", error);
    return NextResponse.json(
      { error: error.message || "Unknown error occurred" },
      { status: 500 }
    );
  }
}
