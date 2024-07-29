export type TabField = {
  label: string;
  placeholder: string;
  type: string;
  field: string;
  defaultValue?: string;
  errorMessage?: string;
  required?: boolean;
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
        required: true,
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
        required: true,
      },
      {
        label: "Voice",
        placeholder: "Select voice",
        type: "dropdown",
        field: "voice",
        required: true,
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
        required: true,
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
        placeholder: "Enter knowledge base URL",
        type: "text",
        field: "knowledgeBase",
        required: true,
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
        required: true,
      },
    ],
  },
  {
    key: "details",
    title: "Details",
    nextKey: "post-call-analysis",
    fields: [
      {
        label: "Enter the First Line",
        placeholder: "First line...",
        type: "text",
        field: "firstLine",
        required: true,
      },
      {
        label: "Tone",
        placeholder: "Tone...",
        type: "text",
        field: "tone",
        required: true,
      },
    ],
  },
  {
    key: "post-call-analysis",
    title: "Post Call Analysis",
    nextKey: "review",
    fields: [],
  },
  {
    key: "review",
    title: "Review",
    nextKey: "",
    fields: [], // No fields needed, just display collected data
  },
];
