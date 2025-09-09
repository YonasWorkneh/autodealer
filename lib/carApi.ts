"use server";
import type { Car } from "@/app/types/Car"; // move your interfaces to a types file for reusability
import type { Make } from "@/app/types/Make";
import type { Model } from "@/app/types/Model";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_API_URL as string;
console.log("baseurl", BASE_URL);

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
    },
  });

  if (!res.ok) {
    throw new Error(`API error: ${res.status} ${res.statusText}`);
  }

  return res.json() as Promise<T>;
}
const credentials = async () => {
  const cookieStore = await cookies();
  const access = cookieStore.get("access")?.value;
  const refresh = cookieStore.get("refresh")?.value;
  return { access, refresh };
};

export async function fetchCars(): Promise<Car[]> {
  const credential = await credentials();
  console.log("credential", credential);
  return fetcher<Car[]>("/inventory/cars/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchCarById(id: string): Promise<Car> {
  return fetcher<Car>(`/inventory/cars/${id}`);
}

export async function fetchMakes(): Promise<Make[]> {
  const credential = await credentials();
  console.log("credential", credential);
  return fetcher<Make[]>("/inventory/makes/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchModels(makeId?: number): Promise<Model[]> {
  const credential = await credentials();
  console.log("credential", credential);
  const url = makeId
    ? `/inventory/models/?make=${makeId}`
    : "/inventory/models/";
  return fetcher<Model[]>(url);
}

export async function postCar(car: Car): Promise<Car> {
  const formData = new FormData();

  // Add all fields except images
  Object.keys(car).forEach((key) => {
    if (key !== "images" && car[key as keyof Car] !== undefined) {
      formData.append(key, String(car[key as keyof Car]));
    }
  });

  // Add images
  if (car.images && car.images.length > 0) {
    car.images.forEach((image, index) => {
      if (image.image_url) {
        formData.append(`images`, {
          uri: image.image_url,
          type: "image/jpeg",
          name: `car_image_${index}.jpg`,
        } as any);
      }
    });
  }

  return fetcher<Car>("/inventory/cars/", {
    method: "POST",
    body: formData,
  });
}
