"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Item = { label: string; value: string };

export default function RangeDropdown({
  minPlaceholder,
  maxPlaceholder,
  placeholder,
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
}: {
  items?: Item[]; // kept optional for backward compatibility; ignored for number inputs
  minPlaceholder: string;
  maxPlaceholder: string;
  minValue?: string;
  maxValue?: string;
  placeholder?: string;
  onMinChange: (v: string) => void;
  onMaxChange: (v: string) => void;
}) {
  const toNumber = (v: string | undefined) =>
    v === undefined || v === "" ? undefined : Number(v);

  const handleMin = (v: string) => {
    const n = toNumber(v);
    const max = toNumber(maxValue);
    onMinChange(v);
    if (n !== undefined && max !== undefined && n > max) {
      onMaxChange(String(n));
    }
  };

  const handleMax = (v: string) => {
    const n = toNumber(v);
    const min = toNumber(minValue);
    onMaxChange(v);
    if (n !== undefined && min !== undefined && n < min) {
      onMinChange(String(n));
    }
  };

  const [open, setOpen] = useState(false);

  return (
    <div className="w-full cursor-pointer">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="cursor-pointer">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="bg-white/10 hover:bg-white/20 border-white/20 !text-white col-span-2 w-full p-4 py-8 justify-between"
          >
            <span
              className={!minValue && !maxValue ? "text-white" : undefined}
            >
              {placeholder}
            </span>
            <ChevronsUpDown className="opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent
          className=" p-4 w-full !left-0"
          align={"start"}
          side="bottom"
        >
          <h1 className="mb-5">{placeholder}</h1>
          <div className="grid grid-cols-2 gap-3">
            <Input
              type="number"
              autoFocus
              placeholder={minPlaceholder}
              value={minValue ?? ""}
              onChange={(e) => handleMin(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setOpen(false);
              }}
              className="p-4 py-6"
            />
            <Input
              type="number"
              placeholder={maxPlaceholder}
              value={maxValue ?? ""}
              onChange={(e) => handleMax(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") setOpen(false);
              }}
              className="p-4 py-6"
            />
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
