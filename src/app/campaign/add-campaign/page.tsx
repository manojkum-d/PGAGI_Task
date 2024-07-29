"use client";

import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TabForm from "@/components/component/TabForm";
import { tabsData } from "../../../lib/campaignData";
import { useToast } from "@/components/ui/use-toast"; // Import useToast

type FormData = {
  [key: string]: { [field: string]: string };
};

export default function CampaignTabs() {
  const [selected, setSelected] = useState<string>("campaign-name");
  const [enabledTabs, setEnabledTabs] = useState<string[]>(["campaign-name"]);
  const [formData, setFormData] = useState<FormData>(
    tabsData.reduce((acc: any, tab: any) => {
      acc[tab.key] = tab.fields.reduce((fieldAcc: any, field: any) => {
        fieldAcc[field.field] = "";
        return fieldAcc;
      }, {} as { [field: string]: string });
      return acc;
    }, {} as FormData)
  );
  const { toast } = useToast(); // Initialize toast

  const handleNext = (tabKey: string, nextTabKey: string) => {
    if (nextTabKey && !enabledTabs.includes(nextTabKey)) {
      setEnabledTabs([...enabledTabs, nextTabKey]);
    }
    setSelected(nextTabKey);
  };

  const handleInputChange = (tabKey: string, field: string, value: string) => {
    setFormData((prevData) => {
      return {
        ...prevData,
        [tabKey]: {
          ...prevData[tabKey],
          [field]: value,
        },
      };
    });
  };

  const handleSubmit = async () => {
    const payload = {
      title: formData["campaign-name"]?.campaignName || "",
      voice: formData["language-voice"]?.voice || "",
      language: formData["language-voice"]?.language || "",
      script: formData["script"]?.script || "",
      purpose: formData["purpose"]?.purpose || "",
      knowledgeBase: formData["knowledge-base"]?.knowledgeBase || "",
      calendar: formData["details"]?.calendar || "",
      firstLine: formData["details"]?.firstLine || "",
      tone: formData["details"]?.tone || "",
      postCallAnalysis:
        formData["post-call-analysis"]?.postCallAnalysis === "true",
      postCallAnalysisSchema: {}, // Collect schema data here
    };

    try {
      const response = await fetch("/api/postCampaign", {
        method: "POST",
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
          Authorization: process.env.API_KEY!, // Use API key from environment variable
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        let errorMessage = `Error: ${response.statusText}`;
        try {
          const errorData = await response.json();
          console.log("Error Data:", errorData);

          if (errorData.error) {
            // Parse the errorData.error if it is a JSON string
            try {
              const parsedError = JSON.parse(errorData.error);
              console.log("Parsed Error:", parsedError);
              errorMessage = parsedError?.detail || errorMessage;
            } catch (e) {
              // If parsing fails, assume errorData.error is a string or object
              errorMessage =
                typeof errorData.error === "string"
                  ? errorData.error
                  : errorMessage;
            }
          } else if (errorData.detail) {
            errorMessage = errorData.detail;
          }
        } catch (jsonError) {
          console.error("Failed to parse error response:", jsonError);
        }
        throw new Error(errorMessage);
      }

      const result = await response.json();
      console.log();
      toast({
        description: `Campaign created successfully: ${
          result.message || "Success"
        }`,
      });
      console.log("Campaign created successfully:", result);
    } catch (error: any) {
      toast({
        description: `Failed to create campaign: ${
          error.message || "An error occurred"
        }`,
      });
      console.error("Failed to create campaign:", error);
    }
  };

  return (
    <div className="flex flex-col mx-auto p-4 max-w-[80%] m-4 items-center justify-center">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
        Add New Campaign
      </h1>
      <Card className="max-w-full w-fit h-fit mt-10">
        <CardBody className="overflow-hidden">
          <Tabs
            fullWidth
            size="md"
            aria-label="Campaign Tabs"
            selectedKey={selected}
            onSelectionChange={(key) => setSelected(key as string)}
          >
            {tabsData.map((tab, index) => (
              <Tab
                key={tab.key}
                title={tab.title}
                isDisabled={!enabledTabs.includes(tab.key)}
              >
                <TabForm
                  tab={tab}
                  formData={formData[tab.key]}
                  handleInputChange={(field: any, value: any) =>
                    handleInputChange(tab.key, field, value)
                  }
                  handleNext={() =>
                    handleNext(tab.key, tabsData[index + 1]?.key)
                  }
                  handleSubmit={handleSubmit} // Pass handleSubmit to TabForm
                  collectedData={formData} // Pass the entire formData for review tab
                />
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
