"use client";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "./ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useMakes, useModels } from "@/hooks/cars";
import { Input } from "./ui/input";

export default function FilterSidebar({ close }: { close?: () => void }) {
  const { data: makes, isLoading: isMakesLoading } = useMakes();
  const { data: models, isLoading: isModelsLoading } = useModels();
  const [make, setMake] = useState<number>();
  const [model, setModel] = useState<number>();
  return (
    <Card className="mb-6 sticky top-0 bg-white z-40 shadow-none">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <Button
          variant="outline"
          size="sm"
          className="border-white bg-zinc-900 hover:bg-zinc-800  w-full py-6 cursor-pointer text-white hover:text-white"
          onClick={close}
        >
          Clear filters
        </Button>

        {/* Make & Model */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">
            Make & Model
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Select onValueChange={(value) => setMake(+value)}>
              <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
                <SelectValue placeholder="Make" />
              </SelectTrigger>
              <SelectContent>
                {makes?.map((make: any) =>
                  isMakesLoading ? (
                    <SelectItem value={`loading`} disabled key={make.id}>
                      loading...
                    </SelectItem>
                  ) : (
                    <SelectItem value={`${make.id}`} key={make.id}>
                      {make.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
            <Select
              disabled={make === undefined}
              onValueChange={(value) => setModel(+value)}
            >
              <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {models?.map((model: any) =>
                  isModelsLoading ? (
                    <SelectItem value={`loading`} disabled key={model.id}>
                      loading...
                    </SelectItem>
                  ) : (
                    <SelectItem value={`${model.id}`} key={model.id}>
                      {model.name}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Year Range */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Year</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="1940"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="2026"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>

        {/* Price Range */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Price</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="$0"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="$100,000+"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>

        {/* Max Mileage */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">Max Mileage</h3>
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-2">
            <Input
              placeholder="0 mi."
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="300,000+ mi."
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
