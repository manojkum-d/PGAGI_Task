// hooks/useSupportedVoices.ts
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export const useSupportedVoices = () => {
  const { data, error } = useSWR("/api/getSupportedVoices", fetcher);

  return {
    voices: data?.result?.voice || [],
    isLoading: !error && !data,
    isError: error,
  };
};
