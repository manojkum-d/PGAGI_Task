// data.ts
export type TabField = {
  label: string;
  placeholder: string;
  type: string;
  field: string;
  defaultValue?: string;
  errorMessage?: string;
};

export type TabData = {
  key: string;
  title: string;
  nextKey: string;
  fields: TabField[];
};

export const tabsData: TabData[] = [
  {
    key: "campaign-name",
    title: "Campaign Name",
    nextKey: "language-voice",
    fields: [
      {
        label: "Campaign Name",
        placeholder: "Enter campaign name",
        type: "text",
        field: "campaignName",
      },
    ],
  },
  {
    key: "language-voice",
    title: "Language & Voice",
    nextKey: "script",
    fields: [
      {
        label: "Language",
        placeholder: "Select language",
        type: "dropdown",
        field: "language",
      },
      {
        label: "Voice",
        placeholder: "Select voice",
        type: "dropdown",
        field: "voice",
      },
    ],
  },
  {
    key: "script",
    title: "Script",
    nextKey: "knowledge-base",
    fields: [
      {
        label: "Script",
        placeholder: "Enter script",
        type: "textarea",
        field: "script",
        defaultValue: "",
        errorMessage: "Enter the Script.",
      },
    ],
  },
  {
    key: "knowledge-base",
    title: "Knowledge Base",
    nextKey: "purpose",
    fields: [
      {
        label: "Knowledge Base",
        placeholder: "Enter knowledge base",
        type: "file",
        field: "knowledgeBase",
      },
    ],
  },
  {
    key: "purpose",
    title: "Purpose",
    nextKey: "details",
    fields: [
      {
        label: "Purpose",
        placeholder: "Enter purpose",
        type: "text",
        field: "purpose",
      },
    ],
  },
  {
    key: "details",
    title: "Details",
    nextKey: "post-call-analysis",
    fields: [
      {
        label: "Details",
        placeholder: "Enter details",
        type: "text",
        field: "details",
      },
    ],
  },
  {
    key: "post-call-analysis",
    title: "Post Call Analysis",
    nextKey: "review",
    fields: [
      {
        label: "Post Call Analysis",
        placeholder: "Enter post call analysis",
        type: "text",
        field: "postCallAnalysis",
      },
    ],
  },
  {
    key: "review",
    title: "Review",
    nextKey: "",
    fields: [
      {
        label: "Review",
        placeholder: "Enter review",
        type: "text",
        field: "review",
      },
    ],
  },
];
