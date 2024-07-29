export const getfetcher = async (url: string, token: string) => {
  try {
    const response = await fetch(url, {
      headers: {
        accept: "application/json",
        Authorization: token,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log("Fetched data:", data); // Log the fetched data
    return data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const Postfetcher = async (
  url: string,
  token: string | undefined,
  body?: any
) => {
  if (!token) {
    throw new Error("Token is required");
  }

  const headers: HeadersInit = {
    Accept: "application/json",
    Authorization: token, // Token should already include 'Bearer'
  };

  if (body) {
    headers["Content-Type"] = "application/json";
  }

  const response = await fetch(url, {
    method: body ? "POST" : "GET",
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(error);
  }

  return response.json();
};
