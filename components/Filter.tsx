"use client";
import { useState, useEffect } from "react";
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

type Filters = {
  makeId?: number;
  modelId?: number;
  makeName?: string;
  modelName?: string;
  yearMin?: number;
  yearMax?: number;
  priceMin?: number;
  priceMax?: number;
  mileageMin?: number;
  mileageMax?: number;
};

export default function FilterSidebar({
  close,
  initial,
  onApply,
  onClear,
}: {
  close?: () => void;
  initial?: Filters;
  onApply?: (filters: Filters) => void;
  onClear?: () => void;
}) {
  const { data: makes, isLoading: isMakesLoading } = useMakes();
  const [make, setMake] = useState<number | undefined>(initial?.makeId);
  const { data: models, isLoading: isModelsLoading } = useModels(make);
  const [model, setModel] = useState<number | undefined>(initial?.modelId);
  const [yearMin, setYearMin] = useState<number | undefined>(initial?.yearMin);
  const [yearMax, setYearMax] = useState<number | undefined>(initial?.yearMax);
  const [priceMin, setPriceMin] = useState<number | undefined>(
    initial?.priceMin
  );
  const [priceMax, setPriceMax] = useState<number | undefined>(
    initial?.priceMax
  );
  const [mileageMin, setMileageMin] = useState<number | undefined>(
    initial?.mileageMin
  );
  const [mileageMax, setMileageMax] = useState<number | undefined>(
    initial?.mileageMax
  );

  // when make changes, clear model
  useEffect(() => {
    setModel(undefined);
  }, [make]);

  // Apply filters immediately for dropdowns, with debounce for text inputs
  useEffect(() => {
    // Debounce for text inputs (year, price, mileage)
    const timer = setTimeout(() => {
      const selectedMake = makes?.find((m: any) => m.id === make);
      const selectedModel = models?.find((m: any) => m.id === model);

      onApply?.({
        makeId: make,
        modelId: model,
        makeName: selectedMake?.name,
        modelName: selectedModel?.name,
        yearMin,
        yearMax,
        priceMin,
        priceMax,
        mileageMin,
        mileageMax,
      });
    }, 500); // 500ms debounce for text inputs

    return () => clearTimeout(timer);
  }, [
    make,
    model,
    yearMin,
    yearMax,
    priceMin,
    priceMax,
    mileageMin,
    mileageMax,
    makes,
    models,
    onApply,
  ]);

  return (
    <Card className="mb-6 sticky top-0 bg-white z-40 shadow-none">
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="bg-gray-100 hover:bg-gray-200 w-full py-6 cursor-pointer"
            onClick={() => {
              setMake(undefined);
              setModel(undefined);
              setYearMin(undefined);
              setYearMax(undefined);
              setPriceMin(undefined);
              setPriceMax(undefined);
              setMileageMin(undefined);
              setMileageMax(undefined);
              onClear?.();
            }}
          >
            Clear filters
          </Button>
        </div>

        {/* Make & Model */}
        <div>
          <h3 className="text-sm font-semibold text-black mb-3">
            Make & Model
          </h3>
          <div className="grid grid-cols-2 gap-4">
            <Select
              value={make?.toString()}
              onValueChange={(value) => setMake(+value)}
            >
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
              value={model?.toString()}
              onValueChange={(value) => setModel(+value)}
            >
              <SelectTrigger className="border-gray-300 w-full !h-[50px] !rounded-sm">
                <SelectValue placeholder="Model" />
              </SelectTrigger>
              <SelectContent>
                {isModelsLoading ? (
                  <SelectItem value={`loading`} disabled>
                    loading...
                  </SelectItem>
                ) : (
                  models
                    ?.filter(
                      (model: any) =>
                        model.make?.id === make || model.make_id === make
                    )
                    ?.map((model: any) => (
                      <SelectItem value={`${model.id}`} key={model.id}>
                        {model.name}
                      </SelectItem>
                    ))
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
              value={yearMin?.toString() || ""}
              onChange={(e) =>
                setYearMin(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="2026"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
              value={yearMax?.toString() || ""}
              onChange={(e) =>
                setYearMax(
                  e.target.value ? parseInt(e.target.value) : undefined
                )
              }
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
              value={priceMin?.toString() || ""}
              onChange={(e) =>
                setPriceMin(
                  e.target.value
                    ? parseInt(e.target.value.replace(/[^0-9]/g, ""))
                    : undefined
                )
              }
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="$100,000+"
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
              value={priceMax?.toString() || ""}
              onChange={(e) =>
                setPriceMax(
                  e.target.value
                    ? parseInt(e.target.value.replace(/[^0-9]/g, ""))
                    : undefined
                )
              }
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
              value={mileageMin?.toString() || ""}
              onChange={(e) =>
                setMileageMin(
                  e.target.value
                    ? parseInt(e.target.value.replace(/[^0-9]/g, ""))
                    : undefined
                )
              }
            />
            <span className="text-gray-500">to</span>
            <Input
              placeholder="300,000+ mi."
              className="text-sm border-gray-300 h-[50px] rounded-sm w-full sm:flex-1"
              value={mileageMax?.toString() || ""}
              onChange={(e) =>
                setMileageMax(
                  e.target.value
                    ? parseInt(e.target.value.replace(/[^0-9]/g, ""))
                    : undefined
                )
              }
            />
          </div>
        </div>
        <Button
          size="sm"
          className="w-full py-6 cursor-pointer"
          onClick={() => {
            const selectedMake = makes?.find((m: any) => m.id === make);
            const selectedModel = models?.find((m: any) => m.id === model);
            onApply?.({
              makeId: make,
              modelId: model,
              makeName: selectedMake?.name,
              modelName: selectedModel?.name,
              yearMin,
              yearMax,
              priceMin,
              priceMax,
              mileageMin,
              mileageMax,
            });
            close?.();
          }}
        >
          Apply Filters
        </Button>
      </CardContent>
    </Card>
  );
}
