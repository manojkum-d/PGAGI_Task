import { getfetcher } from "@/lib/fetcher";
import useSWR from "swr";

export const useCampaigns = () => {
  const token = process.env.API_KEY;
  const fetcher = (url: string) => getfetcher(url, token as string);

  const { data, error } = useSWR(`/api/getCampaign`, fetcher);

  console.log("Raw data from API:", data);

  // Ensure data is an object and transform it into an array of campaigns
  const campaigns = data?.result
    ? Object.values(data.result).map((campaign: any) => ({
        id: campaign.id,
        ...campaign,
      }))
    : [];

  // Check if the title exists in the campaign and log it
  campaigns.forEach((campaign) => {
    if (campaign.title) {
      console.log(campaign.title);
    } else {
      console.warn(`Campaign with ID ${campaign.id} has no title.`);
    }
  });

  return {
    campaigns,
    isLoading: !error && !data,
    isError: error,
  };
};
