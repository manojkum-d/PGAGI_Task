export const fetcher = async (url: string, token: string) => {
  const response = await fetch(url, {
    headers: {
      accept: "application/json",
      Authorization: `${token}`,
    },
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data;
};
