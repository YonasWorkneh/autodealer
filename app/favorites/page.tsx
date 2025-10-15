"use client";

import Header from "@/components/Header";
import { Heart, Link, CarFrontIcon } from "lucide-react";
import { useCarFavorites, useRemoveFavorite } from "@/hooks/cars";

import { useToast } from "@/hooks/use-toast";

import FavoriteCarCard from "@/components/FavouriteCarCard";

export default function FavoritesPage() {
  const { toast } = useToast();
  const { data: favorites, isLoading: favoritesLoading } = useCarFavorites();

  const onRemoveSuccess = () => {
    toast({
      title: "Removed from favorites",
      description: "Car has been removed from your favorites.",
    });
  };

  const onRemoveError = () => {
    toast({
      title: "Failed to remove",
      description:
        "Something went wrong while removing the car from favorites.",
      variant: "destructive",
    });
  };

  const { mutate: removeFavorite, isPending: isRemoving } = useRemoveFavorite(
    onRemoveSuccess,
    onRemoveError
  );

  return (
    <>
      <Header color="black" />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">
            Favorites {!favoritesLoading && `(${favorites?.length || 0})`}
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            These are the cars you have marked as favorites.
          </p>
        </div>

        {/* Loading State */}
        {favoritesLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <div className="bg-gray-200 h-48 w-full"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                    <div className="h-8 bg-gray-200 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : !favorites || favorites.length === 0 ? (
          // Empty State
          <div className="flex items-center justify-center min-h-[50vh]">
            <div className="text-center max-w-md">
              <div className="mb-6">
                <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  No favorites yet
                </h2>
                <p className="text-gray-600 mb-6">
                  Start exploring cars and add them to your favorites to see
                  them here.
                </p>
              </div>
              <Link
                href={`/listing`}
                className="text-sm font-medium text-white bg-zinc-800 hover:bg-zinc-900 cursor-pointer flex items-center gap-1 group p-4 py-2 rounded-sm"
              >
                <CarFrontIcon />
                <span>Browse cars</span>
                <span className="group-hover:translate-x-1 transition-all">
                  →
                </span>
              </Link>
            </div>
          </div>
        ) : (
          // Car Grid
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((favorite) => (
              <FavoriteCarCard
                key={favorite.id}
                favorite={favorite}
                onRemove={() => removeFavorite(favorite.id)}
                isRemoving={isRemoving}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
