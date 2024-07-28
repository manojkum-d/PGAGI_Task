// FormComponent.tsx
import React from "react";
import { Input, Button } from "@nextui-org/react";
import { TabField } from "../lib/campaignData";

type FormComponentProps = {
  tabKey: string;
  fields: TabField[];
  formData: { [field: string]: string };
  handleInputChange: (tabKey: string, field: string, value: string) => void;
  handleSave: (tabKey: string, nextTabKey: string) => void;
  nextTabKey: string;
};

const FormComponent: React.FC<FormComponentProps> = ({
  tabKey,
  fields,
  formData,
  handleInputChange,
  handleSave,
  nextTabKey,
}) => {
  return (
    <form className="flex flex-col gap-4">
      {fields.map((field) => (
        <Input
          key={field.label}
          isRequired
          label={field.label}
          placeholder={field.placeholder}
          type={field.type}
          value={formData[field.field]}
          onChange={(e) =>
            handleInputChange(tabKey, field.field, e.target.value)
          }
        />
      ))}
      <div className="flex gap-2 justify-end">
        <Button
          fullWidth
          color="primary"
          onPress={() => handleSave(tabKey, nextTabKey)}
        >
          Save
        </Button>
      </div>
    </form>
  );
};

export default FormComponent;
