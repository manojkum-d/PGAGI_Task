"use client";
import React, { useState } from "react";
import { Tabs, Tab, Card, CardBody } from "@nextui-org/react";
import TabForm from "@/components/component/TabForm";
import { tabsData, TabData, TabField } from "../../../lib/campaignData";

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

  const handleSave = (tabKey: string, nextTabKey: string) => {
    if (!enabledTabs.includes(nextTabKey)) {
      setEnabledTabs([...enabledTabs, nextTabKey]);
    }
    setSelected(nextTabKey);
  };

  const handleInputChange = (tabKey: string, field: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [tabKey]: {
        ...prevData[tabKey],
        [field]: value,
      },
    }));
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
            {tabsData.map((tab) => (
              <Tab
                key={tab.key}
                title={tab.title}
                isDisabled={!enabledTabs.includes(tab.key)}
              >
                <TabForm
                  tab={tab}
                  formData={formData[tab.key]}
                  handleInputChange={(field, value) =>
                    handleInputChange(tab.key, field, value)
                  }
                  handleSave={() => handleSave(tab.key, tab.nextKey)}
                />
              </Tab>
            ))}
          </Tabs>
        </CardBody>
      </Card>
    </div>
  );
}
