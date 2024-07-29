// hooks/useCreateCampaign.ts
import useSWR from "swr";
import { mutate } from "swr";
import { getfetcher, Postfetcher } from "../lib/fetcher";

interface CampaignData {
  title: string;
  voice: string;
  language: string;
  script: string;
  purpose: string;
  knowledgeBase: string;
  calendar: string;
  firstLine: string;
  tone: string;
  postCallAnalysis: boolean;
  postCallAnalysisSchema: Record<string, any>;
}

export const useCreateCampaign = (token: string) => {
  const { data, error } = useSWR(
    token ? ["/api/getCampaigns", token] : null,
    ([url, token]) => getfetcher(url, token)
  );

  const validateCampaignData = (data: CampaignData): string | null => {
    if (data.title.length < 5) {
      return "Title must be at least 5 characters long.";
    }
    if (!data.voice) {
      return "Voice must be selected.";
    }
    if (!data.language) {
      return "Language must be selected.";
    }
    if (!data.script) {
      return "Script is required.";
    }
    // Add more validations as needed
    return null;
  };

  const createCampaign = async (body: CampaignData) => {
    if (!token) {
      throw new Error("Token is required");
    }

    const validationError = validateCampaignData(body);
    if (validationError) {
      throw new Error(validationError);
    }

    try {
      const response = await Postfetcher("/api/postCampaign", token, body);
      mutate(["/api/getCampaigns", token]); // Update SWR cache
      return response;
    } catch (error: any) {
      console.error("Failed to create campaign:", error.message);
      throw error;
    }
  };

  return {
    data,
    error,
    createCampaign,
    isLoading: !error && !data,
  };
};
