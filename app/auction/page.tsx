"use client";

import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import Image from "next/image";
import { useRouter } from "next/navigation";

const mockAuctions = [
  {
    id: 1,
    title: "2013 Subaru Forester Premium Plus",
    location: "Subaru Champlin, Othoberg, HI 78276",
    auctionNumber: "#20199884",
    details: "11 475 Miles • White • AWD • 4-Cylinder Turbo",
    timeLeft: "10d 12hrs",
    endTime: "Sunday, 9:38PM",
    activeBids: 18,
    currentBid: "$14,000",
    images: [
      "/bmw-front.jpeg",
      "/bmw-back.jpg",
      "/bmw-side.jpg",
      "/bmw-side2.jpg",
    ],
    brand: "S",
    brandColor: "bg-blue-600",
  },
  {
    id: 2,
    title: "2018 BMW 330i xDrive",
    location: "BMW Manhattan, New York, NY 10019",
    auctionNumber: "#20199885",
    details: "45 230 Miles • Black • AWD • 4-Cylinder Turbo",
    timeLeft: "2d 8hrs",
    endTime: "Friday, 3:15PM",
    activeBids: 24,
    currentBid: "$18,500",
    images: [
      "/bmw-front.jpeg",
      "/bmw-back.jpg",
      "/bmw-side.jpg",
      "/bmw-side2.jpg",
    ],
    brand: "B",
    brandColor: "bg-gray-800",
  },
  {
    id: 3,
    title: "2018 BMW 330i xDrive",
    location: "BMW Manhattan, New York, NY 10019",
    auctionNumber: "#20199885",
    details: "45 230 Miles • Black • AWD • 4-Cylinder Turbo",
    timeLeft: "2d 8hrs",
    endTime: "Friday, 3:15PM",
    activeBids: 24,
    currentBid: "$18,500",
    images: [
      "/bmw-front.jpeg",
      "/bmw-back.jpg",
      "/bmw-side.jpg",
      "/bmw-side2.jpg",
    ],
    brand: "B",
    brandColor: "bg-gray-800",
  },
];

const AuctionListView = () => {
  const router = useRouter();

  return (
    <div className="bg-white">
      {/* Header */}
      <Header color="black" />

      <div className="space-y-4 px-6 md:px-50 py-10">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight">
          Live Car Auctions
        </h2>
        <p className="my-6 md:my-10 text-black/60 text-sm md:text-base">
          Discover exclusive vehicles and place your bids in real-time. Compete
          with other buyers, track bidding activity, and secure your dream car
          at the best price.
        </p>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-1">
          {mockAuctions.map((auction) => (
            <Card
              key={auction.id}
              className="shadow-none bg-white border-gray-200 overflow-hidden cursor-pointer hover:shadow-sm transition-shadow"
              onClick={() => router.push(`/auction/${auction.id}`)}
            >
              <div className="p-4 md:p-6">
                <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
                  {/* Car Image */}
                  <div className="w-full sm:w-48 h-48 sm:h-32 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                    <Image
                      src={auction.images[0] || "/placeholder.svg"}
                      alt={auction.title}
                      width={200}
                      height={130}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Auction Details */}
                  <div className="flex-1 space-y-2 md:space-y-3">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 md:gap-3">
                        <div
                          className={`w-8 h-8 ${auction.brandColor} rounded-full flex items-center justify-center`}
                        >
                          <span className="text-white text-sm font-bold">
                            {auction.brand}
                          </span>
                        </div>
                        <span className="text-gray-600 text-xs md:text-sm">
                          {auction.location}
                        </span>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-gray-100 text-gray-700 text-xs md:text-sm"
                      >
                        {auction.auctionNumber}
                      </Badge>
                    </div>

                    {/* Car Title */}
                    <div>
                      <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-1">
                        {auction.title}
                      </h3>
                      <p className="text-gray-600 text-xs md:text-sm">
                        {auction.details}
                      </p>
                    </div>

                    {/* Auction Stats */}
                    <div className="flex flex-wrap gap-4 md:gap-8 text-xs md:text-sm">
                      <div>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {auction.timeLeft}
                        </div>
                        <div className="text-xs text-gray-600">Time Left</div>
                      </div>
                      <div>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {auction.endTime}
                        </div>
                        <div className="text-xs text-gray-600">
                          Auction Ending
                        </div>
                      </div>
                      <div>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {auction.activeBids}
                        </div>
                        <div className="text-xs text-gray-600">Active bids</div>
                      </div>
                      <div>
                        <div className="text-sm md:text-lg font-bold text-gray-900">
                          {auction.currentBid}
                        </div>
                        <div className="text-xs text-gray-600">Current bid</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AuctionListView;
