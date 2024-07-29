import { NextRequest, NextResponse } from "next/server";
import { Postfetcher } from "../../../lib/fetcher";

export async function POST(req: NextRequest) {
  const token = process.env.API_KEY; // Ensure this is defined
  const url = "https://www.toingg.com/api/v3/create_campaign/";

  if (!token) {
    console.error("API token is missing");
    return NextResponse.json(
      { error: "API token is missing" },
      { status: 500 }
    );
  }

  try {
    const requestBody = await req.json(); // Parse the request body

    // Log debugging information
    console.log("API Token:", token);
    console.log("Request Body:", requestBody);

    const data = await Postfetcher(url, token as string, requestBody); // Pass requestBody to fetcher
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("Error:", error.message); // Log error message
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
