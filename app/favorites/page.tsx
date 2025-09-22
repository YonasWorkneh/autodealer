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

  // If no favorites, show empty state
  if (favoritesLoading) {
    return (
      <>
        <Header color="black" />
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 bg-white min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-black mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your favorites...</p>
          </div>
        </div>
      </>
    );
  }

  if (!favorites || favorites.length === 0) {
    return (
      <>
        <Header color="black" />
        <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 bg-white min-h-screen flex items-center justify-center">
          <div className="text-center max-w-md">
            <div className="mb-6">
              <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                No favorites yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start exploring cars and add them to your favorites to see them
                here.
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
      </>
    );
  }

  return (
    <>
      <Header color="black" />
      <div className="px-4 sm:px-6 md:px-10 lg:px-20 xl:px-50 py-8 bg-white min-h-screen">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-black">
            Favorites ({favorites.length})
          </h1>
          <p className="text-gray-500 text-sm sm:text-base mt-2">
            These are the cars you have marked as favorites.
          </p>
        </div>

        {/* Car Grid */}
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
      </div>
    </>
  );
}
