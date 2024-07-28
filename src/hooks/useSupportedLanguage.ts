// hooks/useSupportedLanguages.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSupportedLanguages = () => {
  const { data, error } = useSWR("/api/getSupportedLanguages", fetcher);

  //   console.log("Fetching supported languages:", data.result.languages);

  return {
    languages: data?.result?.languages || [],
    isLoading: !error && !data,
    isError: error,
  };
};
