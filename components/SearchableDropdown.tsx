"use client";

import { useState } from "react";
import { ChevronsUpDown, Check, Search as SearchIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";

type Item = { label: string; value: number | null };

export default function SearchableDropdown({
  items = [],
  placeholder,
  value,
  onChange,
  className,
}: {
  items?: Item[];
  placeholder: string;
  value?: number|null;
  onChange: (v: number) => void;
  className?: string;
}) {
  const [open, setOpen] = useState(false);
  const selected = items?.find((it) => it.value === value)?.label ?? "";

  return (
    <div className="w-full cursor-pointer">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="w-full cursor-pointer">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(
              "bg-white/10 hover:bg-white/20 border-white/20 !text-white w-full p-4 py-8 justify-between",
              className
            )}
          >
            <span className={cn(!selected && "text-white")}>
              {selected || placeholder}
            </span>
            <ChevronsUpDown className="opacity-70" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full" align={"start"}>
          <Command className="w-[400px]">
            <CommandInput
              placeholder={`Search ${placeholder}`}
              className="w-full"
            />
            <CommandList className="w-full">
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup className="w-full">
                {items?.map((it) => (
                  <CommandItem
                    key={it.value}
                    value={it.label}
                    onSelect={() => {
                      it.value && onChange(it.value);
                      setOpen(false);
                    }}
                    className="text-black data-[selected=true]:text-black/70"
                  >
                    <Check
                      className={cn(
                        "mr-2 size-4",
                        value === it.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {it.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
