"use server";
import type { Car, FetchedCar } from "@/app/types/Car"; // move your interfaces to a types file for reusability
import type { Make } from "@/app/types/Make";
import type { Model } from "@/app/types/Model";
import { cookies } from "next/headers";

const BASE_URL = process.env.BASE_API_URL as string;

async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options?.headers || {}),
    },
  });
  console.log(res);

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
  return fetcher<Car[]>("/inventory/cars/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchCarById(id: string): Promise<FetchedCar> {
  const credential = await credentials();
  return fetcher<FetchedCar>(`/inventory/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchMakes(): Promise<Make[]> {
  const credential = await credentials();
  return fetcher<Make[]>("/inventory/makes/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchModels(makeId?: number): Promise<Model[]> {
  const credential = await credentials();
  const url = makeId
    ? `/inventory/models/?make=${makeId}`
    : "/inventory/models/";
  return fetcher<Model[]>(url, {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function postCar(formData: FormData): Promise<Car> {
  const credential = await credentials();

  return fetcher<Car>("/inventory/cars/", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function getMyAds(id: number | undefined) {
  if (!id) return [];
  const credential = await credentials();
  const myAds = await fetcher<FetchedCar[]>("/inventory/cars/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
  return myAds.filter((car) => car.broker === id);
}

export async function deleteCar(id: number) {
  const credential = await credentials();
  const res = await fetch(`${BASE_URL}/inventory/cars/${id}/`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Delete failed: ${res.status} ${res.statusText}`);
  }

  // Return something serializable (plain object)
  return { success: true, id };
}
