import { Input } from "@nextui-org/react";

interface TextInputProps {
  label: string;
  placeholder: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  placeholder,
  type,
  value,
  onChange,
}) => {
  return (
    <Input
      isRequired
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
};

export default TextInput;
