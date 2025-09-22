import Image from "next/image";
import { Card, CardContent } from "./ui/card";
import { formatPrice } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useCar } from "@/hooks/cars";
import { Favorite } from "@/app/types/Favorite";
import { Button } from "./ui/button";
import { Heart, X } from "lucide-react";

interface FavoriteCarCardProps {
  favorite: Favorite;
  onRemove: () => void;
  isRemoving?: boolean;
}

const FavoriteCarCard = ({
  favorite,
  onRemove,
  isRemoving,
}: FavoriteCarCardProps) => {
  const [hovered, setHovered] = useState(false);
  const router = useRouter();
  const { data: car, isLoading, error } = useCar(favorite.car.toString());

  if (isLoading) {
    return (
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-sm !pt-0">
        <div className="w-full h-56 sm:h-64 lg:h-48 bg-gray-100 animate-pulse" />
        <CardContent className="p-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-1/2" />
          <div className="h-10 bg-gray-200 rounded animate-pulse" />
        </CardContent>
      </Card>
    );
  }

  if (error || !car) {
    return (
      <Card className="overflow-hidden bg-white border border-gray-200 shadow-sm pt-0">
        <div className="w-full h-56 sm:h-64 lg:h-48 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Failed to load car</p>
        </div>
        <CardContent className="p-4">
          <p className="text-gray-500">Unable to load car details</p>
        </CardContent>
      </Card>
    );
  }

  const mainImage = car.images?.[0]?.image_url || "/placeholder.svg";
  const carName = `${car.make} ${car.model}`;
  const formattedPrice = formatPrice(parseFloat(car.price));

  return (
    <Card
      className="overflow-hidden bg-white border border-gray-200 shadow-sm transition-shadow hover:shadow-md cursor-pointer !pt-0"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => router.push(`/listing/${car.id}`)}
    >
      {/* Car Image */}
      <div className="relative w-full h-56 sm:h-64 lg:h-48 bg-gray-100 overflow-hidden">
        <Image
          src={mainImage}
          alt={`${carName} ${car.year}`}
          fill
          className="object-cover transition-transform hover:scale-105"
        />
      </div>

      {/* Card Content */}
      <CardContent className="p-4">
        <h3 className="text-lg sm:text-xl font-semibold text-black mb-2">
          {carName} {car.year}
        </h3>

        <div className="space-y-1 mb-3">
          <p className="text-gray-700 font-bold text-lg">{formattedPrice}</p>
          <p className="text-sm text-gray-600">
            {car.mileage?.toLocaleString()} miles
          </p>
          <p className="text-sm text-gray-600 capitalize">{car.fuel_type}</p>
        </div>

        <Button
          variant="outline"
          className={`flex w-full items-center justify-center gap-2 border-gray-300 text-gray-700 hover:bg-red-500 hover:text-white transition-colors ${
            isRemoving ? "opacity-50 cursor-not-allowed" : ""
          }`}
          onClick={(e) => {
            e.stopPropagation();
            if (hovered && !isRemoving) {
              onRemove();
            }
          }}
          disabled={isRemoving}
        >
          {hovered ? <X className="w-4 h-4" /> : <Heart className="w-4 h-4" />}
          {hovered ? (isRemoving ? "Removing..." : "Remove") : "Favorite"}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FavoriteCarCard;
