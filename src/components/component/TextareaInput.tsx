import { Textarea } from "@nextui-org/react";

interface TextareaInputProps {
  label: string;
  placeholder: string;
  defaultValue?: string;
  value: string;
  onChange: (value: string) => void;
  errorMessage?: string;
}

const TextareaInput: React.FC<TextareaInputProps> = ({
  label,
  placeholder,
  defaultValue,
  value,
  onChange,
  errorMessage,
}) => {
  return (
    <Textarea
      isInvalid={!value}
      variant="faded"
      isRequired
      label={label}
      placeholder={placeholder}
      defaultValue={defaultValue}
      value={value}
      description="Enter a concise script"
      onChange={(e) => onChange(e.target.value)}
      errorMessage={errorMessage}
    />
  );
};

export default TextareaInput;
