import React from "react";
import { Input } from "@nextui-org/react";

interface TextInputProps {
  label: string;
  placeholder: string;
  type?: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  errorMessage?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type = "text",
  value,
  onChange,
  required,
  errorMessage,
}) => {
  return (
    <div>
      <Input
        label={label}
        placeholder={placeholder}
        type={type}
        value={value}
        required={required}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMessage && <p>{errorMessage}</p>}
    </div>
  );
};

export default TextInput;
