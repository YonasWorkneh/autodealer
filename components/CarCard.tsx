"use client";

import { CardContent } from "@/components/ui/card";
import { Gauge, Settings } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";

type Props = {
  title: string;
  backgroundTitle: string;
  km: number;
  transmission: string;
  price: number;
  image: string;
  colors: string[];
  selectedColor?: number;
};

export default function CarCard({
  title,
  backgroundTitle,
  km,
  transmission,
  price,
  image,
  colors,
  selectedColor = 0,
}: Props) {
  const [activeColor, setActiveColor] = useState(selectedColor);

  const formatNumber = (n: number) =>
    new Intl.NumberFormat(undefined, { maximumFractionDigits: 0 }).format(n);

  return (
    <Link href={"#"} className="flex h-full flex-col">
      <div className="relative h-[190px] w-full">
        {/* Watermark model name */}
        <div className="absolute inset-0 flex items-start justify-center pt-6">
          <div className="select-none text-4xl font-extrabold tracking-tight text-neutral-100/70 md:text-5xl">
            {backgroundTitle}
          </div>
        </div>
        {/* Car image */}
        <div className="relative z-10 flex h-full items-end justify-center">
          <img
            src={image || "/placeholder.svg"}
            alt={`${title} side view`}
            className="h-[150px] w-auto object-contain"
          />
        </div>
      </div>

      <CardContent className="flex flex-1 flex-col gap-4 pb-6 pt-2">
        {/* Title */}
        <h3 className="text-lg font-semibold tracking-tight text-neutral-900 text-center">
          {title}
        </h3>

        {/* Specs */}
        <div className="flex items-center gap-6 border-b border-neutral-200/70 pb-3">
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Gauge className="h-4 w-4" aria-hidden="true" />
            <span>{formatNumber(km)} km</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-neutral-600">
            <Settings className="h-4 w-4" aria-hidden="true" />
            <span>{transmission}</span>
          </div>
        </div>

        {/* Colors + Price */}
        <div className="mt-1 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {colors.map((c, i) => (
              <button
                key={`${c}-${i}`}
                type="button"
                aria-label={`Select color ${i + 1}`}
                onClick={() => setActiveColor(i)}
                className={cn(
                  "size-4 rounded-full ring-offset-2 transition",
                  activeColor === i
                    ? "ring-2 ring-neutral-400"
                    : "ring-0 opacity-90 hover:opacity-100"
                )}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          <div className="text-sm">
            <span className="text-neutral-500">from</span>{" "}
            <span className="font-semibold text-neutral-900">
              {"ETB " + formatNumber(price)}
            </span>
          </div>
        </div>
      </CardContent>
    </Link>
  );
}
