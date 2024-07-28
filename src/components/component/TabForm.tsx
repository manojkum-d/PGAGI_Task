import React from "react";
import { Button } from "@nextui-org/react";
import { DropdownMenuRadioGroupDemo } from "@/components/DropdownMenuRadioGroupDemo";
import { DropdownMenuRadioGroupDemoVoices } from "@/components/DropdownVoices";
import TextInput from "@/components/component/TextInput";
import TextareaInput from "@/components/component/TextareaInput";
import KnowledgeBase from "@/components/component/KnowledgeBase";
import { TabData, TabField } from "./../../lib/campaignData";

interface TabFormProps {
  tab: TabData;
  formData: { [field: string]: string };
  handleInputChange: (field: string, value: string) => void;
  handleSave: () => void;
}

const TabForm: React.FC<TabFormProps> = ({
  tab,
  formData,
  handleInputChange,
  handleSave,
}) => {
  return (
    <form className="flex flex-col gap-4">
      {tab.fields.map((field: TabField) => {
        const value = formData[field.field] || ""; // Provide a default value
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
                defaultValue={field.defaultValue || ""} // Ensure defaultValue is a string
                value={value}
                onChange={(value: string) =>
                  handleInputChange(field.field, value)
                }
                errorMessage={field.errorMessage}
              />
            );
          case "file":
            if (field.field === "knowledgeBase") {
              return <KnowledgeBase key={field.label} />;
            }
            break;
          default:
            return (
              <TextInput
                key={field.label}
                label={field.label}
                placeholder={field.placeholder}
                type={field.type}
                value={value}
                onChange={(value: string) =>
                  handleInputChange(field.field, value)
                }
              />
            );
        }
      })}
      <div className="flex gap-2 justify-end">
        <Button fullWidth color="primary" onPress={handleSave}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default TabForm;
