import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  fetchCars,
  fetchCarById,
  fetchMakes,
  fetchModels,
  postCar,
  getMyAds,
  deleteCar,
} from "@/lib/carApi";
import type { Car } from "@/app/types/Car";
import { useToast } from "./use-toast";
// const { user } = useUserStore();

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
  return useQuery({
    queryKey: ["models", makeId],
    queryFn: () => fetchModels(makeId),
    enabled: makeId !== undefined,
  });
}

export function usePostCar(onError?: () => void, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postCar(formData),
    onError: () => {
      onError?.();
    },
    onSuccess: () => {
      // refresh list of cars after posting
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["cars"] });
      queryClient.invalidateQueries({ queryKey: ["my-ads"] });
    },
  });
}

export function useMyAds(id: number | undefined) {
  return useQuery({
    queryKey: ["my-ads"],
    queryFn: () => getMyAds(id),
    enabled: id !== undefined,
  });
}

export function useUpdateCar(onError?: () => void, onSuccess?: () => void) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (formData: FormData) => postCar(formData),
    onError: () => {
      console.log("error");
      onError?.();
    },
    onSuccess: () => {
      // refresh list of cars after posting
      onSuccess?.();
      queryClient.invalidateQueries({ queryKey: ["cars"] });
    },
  });
}

export function useDeleteCar(onError?: () => void, onSuccess?: () => void) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteCar(id),
    onError: (err) => {
      console.log("error", err);
      onError?.();
    },
    onSuccess: (data) => {
      console.log("data", data);
      onSuccess?.();
    },
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: ["my-ads", "cars"] }),
  });
}
