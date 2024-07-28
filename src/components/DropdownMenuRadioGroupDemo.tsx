// components/DropdownMenuRadioGroupDemo.tsx
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSupportedLanguages } from "../hooks/useSupportedLanguage";

export function DropdownMenuRadioGroupDemo({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { languages, isLoading, isError } = useSupportedLanguages();

  React.useEffect(() => {
    if (languages.length > 0 && !value) {
      onChange(languages[0]);
    }
  }, [languages, value, onChange]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading languages</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between items-center">
          {value || "Select Language"}
          <span className="ml-2">&#9662;</span> {/* Down arrow */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Select Language</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {languages.map((lang: string) => (
            <DropdownMenuRadioItem key={lang} value={lang}>
              {lang}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
