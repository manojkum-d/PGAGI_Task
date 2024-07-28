// components/DropdownMenuRadioGroupDemoVoices.tsx
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
import { useSupportedVoices } from "../hooks/useSuportedVoices";

export function DropdownMenuRadioGroupDemoVoices({
  value,
  onChange,
}: {
  value: string;
  onChange: (value: string) => void;
}) {
  const { voices, isLoading, isError } = useSupportedVoices();

  React.useEffect(() => {
    if (voices.length > 0 && !value) {
      onChange(voices[0].name);
    }
  }, [voices, value, onChange]);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading voices</div>;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="flex justify-between items-center">
          {value || "Select Voice"}
          <span className="ml-2">▾</span> {/* Down arrow */}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 max-h-60 overflow-y-auto">
        <DropdownMenuLabel>Select Voice</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
          {voices.map((voice: any) => (
            <DropdownMenuRadioItem key={voice.name} value={voice.name}>
              {voice.name} {voice.type && `(${voice.type})`}
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
