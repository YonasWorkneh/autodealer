// hooks/useCar.ts
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCars,
  fetchCarById,
  fetchMakes,
  fetchModels,
  postCar,
} from "@/lib/carApi";
import type { Car } from "@/app/types/Car";

export function useCars() {
  return useQuery({
    queryKey: ["cars"],
    queryFn: fetchCars,
  });
}

export function useCar(id: string) {
  return useQuery({
    queryKey: ["cars", id],
    queryFn: () => fetchCarById(id),
    enabled: !!id, // only run if id exists
  });
}

export function useMakes() {
  return useQuery({
    queryKey: ["makes"],
    queryFn: fetchMakes,
  });
}

export function useModels(makeId?: number) {
  console.log("makeId", makeId);
  return useQuery({
    queryKey: ["models", makeId],
    queryFn: () => fetchModels(makeId),
    enabled: makeId !== undefined,
  });
}

export function usePostCar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (car: Car) => postCar(car),
    onSuccess: () => {
      // refresh list of cars after posting
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}
