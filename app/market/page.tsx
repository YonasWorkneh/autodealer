"use client";

import { useMarketData } from "@/hooks/cars";
import React from "react";
import Header from "@/components/Header";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, Car, DollarSign, ArrowDownRight } from "lucide-react";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";

export default function page() {
  const { data: marketData, isLoading } = useMarketData();

  const items = marketData?.car_summary || [];

  return (
    <div className="min-h-screen bg-white">
      <Header color="black" />
      <div className="pt-16 px-4 sm:px-6">
        <div className="px-40 sm:px-50">
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-zinc-900 flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-zinc-900" />
              Today’s Market
            </h1>
            <p className="text-gray-600 mt-2">
              Live snapshot of pricing trends by make and model. Use this to
              gauge demand, spot deals, and price your listings competitively.
            </p>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {isLoading
              ? Array.from({ length: 6 }).map((_, i) => (
                  <Card key={i} className="shadow-none border-gray-200">
                    <CardContent className="p-6 animate-pulse space-y-3">
                      <div className="h-5 bg-gray-200 rounded w-2/3" />
                      <div className="h-8 bg-gray-200 rounded w-1/3" />
                      <div className="h-20 bg-gray-100 rounded" />
                    </CardContent>
                  </Card>
                ))
              : items.map((row) => (
                  <Card
                    key={`${row.car_make}-${row.car_model}`}
                    className="shadow-none border-gray-200"
                  >
                    <CardContent className="p-6 space-y-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <Car className="h-4 w-4" />
                            <span className="capitalize">{row.car_make}</span>
                          </div>
                          <h3 className="text-xl font-semibold text-zinc-900 capitalize">
                            {row.car_model}
                          </h3>
                        </div>
                        <div className="text-right">
                          <div className="text-xs uppercase text-gray-500">
                            Listings
                          </div>
                          <div className="text-lg font-bold">
                            {row.total_cars}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-gray-700">
                          <DollarSign className="h-5 w-5" />
                          <div>
                            <div className="text-xs uppercase text-gray-500">
                              Average price
                            </div>
                            <div className="text-lg font-bold">
                              {formatPrice(row.average_price)}
                            </div>
                          </div>
                        </div>

                        <Link
                          href={`/listing/${row.cheapest_car.id}`}
                          className="flex items-center gap-2 text-sm text-zinc-900 hover:underline cursor-pointer"
                        >
                          <ArrowDownRight className="h-4 w-4" />
                          Cheapest
                        </Link>
                      </div>

                      <div className="h-32 w-full overflow-hidden rounded-md bg-gray-100">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={row.cheapest_car.image_url}
                          alt={`${row.car_make} ${row.car_model}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
