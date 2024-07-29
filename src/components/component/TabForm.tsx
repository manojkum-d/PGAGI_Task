import React, { useState, useEffect } from "react";
import { Button, Checkbox } from "@nextui-org/react";
import { DropdownMenuRadioGroupDemo } from "@/components/DropdownMenuRadioGroupDemo";
import { DropdownMenuRadioGroupDemoVoices } from "@/components/DropdownVoices";
import TextInput from "@/components/component/TextInput";
import TextareaInput from "@/components/component/TextareaInput";
import { useToast } from "@/components/ui/use-toast";
import { TabData, TabField, tabsData } from "./../../lib/campaignData";

interface TabFormProps {
  tab: TabData;
  formData: { [field: string]: string };
  handleInputChange: (field: string, value: string) => void;
  handleNext: () => void;
  handleSubmit: (formData: any) => Promise<any>;
  collectedData?: { [key: string]: { [field: string]: string } };
}

const TabForm: React.FC<TabFormProps> = ({
  tab,
  formData,
  handleInputChange,
  handleNext,
  handleSubmit,
  collectedData,
}) => {
  const { toast } = useToast();
  const [postCallEnabled, setPostCallEnabled] = useState(false);
  const [additionalFields, setAdditionalFields] = useState<
    { name: string; description: string }[]
  >([]);
  const [knowledgeBaseUrls, setKnowledgeBaseUrls] = useState<string[]>([]);

  useEffect(() => {
    const initialUrls = formData["knowledgeBase"]
      ? formData["knowledgeBase"].split(",")
      : [];
    setKnowledgeBaseUrls(initialUrls);
  }, [formData]);

  const handleKnowledgeBaseChange = (newUrls: string[]) => {
    setKnowledgeBaseUrls(newUrls);
    handleInputChange("knowledgeBase", newUrls.join(","));
  };

  const handleAddField = () => {
    setAdditionalFields([...additionalFields, { name: "", description: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const newFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(newFields);
  };

  const handleAdditionalFieldChange = (
    index: number,
    field: "name" | "description",
    value: string
  ) => {
    const newFields = [...additionalFields];
    newFields[index][field] = value;
    setAdditionalFields(newFields);
  };

  const validateForm = () => {
    for (const field of tab.fields) {
      if (field.required && !formData[field.field]) {
        toast({
          description: `Missing value for ${field.label}.`,
        });
        return false;
      }
      if (field.field === "knowledgeBase" && !knowledgeBaseUrls.length) {
        toast({
          description: "Knowledge base URLs are required.",
        });
        return false;
      }
      if (
        field.field === "script" &&
        (formData[field.field] || "").length < 250
      ) {
        toast({
          description: "Script must be at least 250 characters long.",
        });
        return false;
      }
    }
    return true;
  };

  const handleNextClick = () => {
    if (validateForm()) {
      handleNext();
    }
  };

  const handleFormSubmit = async () => {
    if (validateForm()) {
      try {
        const response = await handleSubmit(formData);

        toast({
          description: `Status Code: ${response.status || "N/A"}`,
        });
      } catch (error: any) {
        toast({
          description: `Status Code: ${error.status || "N/A"}`,
        });
      }
    }
  };

  return (
    <form className="flex flex-col gap-4">
      {tab.fields.map((field: TabField) => {
        const value = formData[field.field] || "";
        switch (field.type) {
          case "dropdown":
            if (field.field === "language") {
              return (
                <DropdownMenuRadioGroupDemo
                  key={field.label}
                  value={value}
                  onChange={(value: string) =>
                    handleInputChange(field.field, value)
                  }
                />
              );
            } else if (field.field === "voice") {
              return (
                <DropdownMenuRadioGroupDemoVoices
                  key={field.label}
                  value={value}
                  onChange={(value: string) =>
                    handleInputChange(field.field, value)
                  }
                />
              );
            }
            break;
          case "textarea":
            return (
              <TextareaInput
                key={field.label}
                label={field.label}
                placeholder={field.placeholder}
                defaultValue={field.defaultValue || ""}
                value={value}
                onChange={(value: string) =>
                  handleInputChange(field.field, value)
                }
              />
            );
          case "file":
            if (field.field === "knowledgeBase") {
              return (
                <div key={field.label}>
                  <label>{field.label}</label>
                  <input
                    type="text"
                    placeholder={field.placeholder}
                    value={value}
                    onChange={(e) =>
                      handleInputChange(field.field, e.target.value)
                    }
                  />
                </div>
              );
            }
            break;
          default:
            return (
              <TextInput
                key={field.label}
                label={field.label}
                placeholder={field.placeholder}
                value={value}
                onChange={(value: string) =>
                  handleInputChange(field.field, value)
                }
                required={field.required}
              />
            );
        }
      })}

      {tab.key === "post-call-analysis" && (
        <div>
          <Checkbox
            checked={postCallEnabled}
            onChange={(e) => setPostCallEnabled(e.target.checked)}
          >
            Enable Post Call Analysis
          </Checkbox>
          {postCallEnabled && (
            <div>
              {additionalFields.map((field, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Name"
                    value={field.name}
                    onChange={(e) =>
                      handleAdditionalFieldChange(index, "name", e.target.value)
                    }
                  />
                  <input
                    type="text"
                    placeholder="Description"
                    value={field.description}
                    onChange={(e) =>
                      handleAdditionalFieldChange(
                        index,
                        "description",
                        e.target.value
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() => handleRemoveField(index)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={handleAddField} className="mt-2">
                Add More
              </button>
            </div>
          )}
        </div>
      )}

      {tab.key === "review" && collectedData && (
        <div className="my-6 w-full overflow-y-auto">
          <table className="w-full">
            <thead>
              <tr className="m-0 border-t p-0 even:bg-muted">
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Field
                </th>
                <th className="border px-4 py-2 text-left font-bold [&[align=center]]:text-center [&[align=right]]:text-right">
                  Value
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(collectedData).map(([key, data]) => (
                <>
                  {Object.entries(data).map(([field, value], index) => (
                    <tr
                      key={`${key}-${field}-${index}`}
                      className="m-0 border-t p-0 even:bg-muted"
                    >
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {field}
                      </td>
                      <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                        {value}
                      </td>
                    </tr>
                  ))}
                </>
              ))}
              {postCallEnabled &&
                additionalFields.map((field, index) => (
                  <tr
                    key={`post-call-analysis-${index}`}
                    className="m-0 border-t p-0 even:bg-muted"
                  >
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Post Call Analysis Name {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {field.name}
                    </td>
                  </tr>
                ))}
              {postCallEnabled &&
                additionalFields.map((field, index) => (
                  <tr
                    key={`post-call-analysis-desc-${index}`}
                    className="m-0 border-t p-0 even:bg-muted"
                  >
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      Post Call Analysis Description {index + 1}
                    </td>
                    <td className="border px-4 py-2 text-left [&[align=center]]:text-center [&[align=right]]:text-right">
                      {field.description}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="flex gap-4">
        <Button type="button" color="primary" onClick={handleFormSubmit}>
          Submit
        </Button>
        <Button type="button" color="secondary" onClick={handleNextClick}>
          Next
        </Button>
      </div>
    </form>
  );
};

export default TabForm;
