import type { Car, FetchedCar } from "@/app/types/Car"; // move your interfaces to a types file for reusability
import { Favorite } from "@/app/types/Favorite";
import type { Make } from "@/app/types/Make";
import type { Model } from "@/app/types/Model";
import { getCredentials } from "./credential";

const BASE_URL = process.env.NEXT_PUBLIC_API_URL as string;

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

export async function fetchCars(): Promise<FetchedCar[]> {
  const credential = await getCredentials();
  return fetcher<FetchedCar[]>("/inventory/cars/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchCarById(id: string): Promise<FetchedCar> {
  const credential = await getCredentials();
  return fetcher<FetchedCar>(`/inventory/cars/${id}`, {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchMakes(): Promise<Make[]> {
  const credential = await getCredentials();
  return fetcher<Make[]>("/inventory/makes/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
}

export async function fetchModels(makeId?: number): Promise<Model[]> {
  const credential = await getCredentials();
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
  const credential = await getCredentials();

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
  const credential = await getCredentials();
  const myAds = await fetcher<FetchedCar[]>("/inventory/cars/", {
    headers: {
      Authorization: `Bearer ${credential.access}`,
    },
  });
  return myAds.filter((car) => car.broker === id);
}

export async function deleteCar(id: number) {
  const credential = await getCredentials();
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

export async function updateCarViews(id: number) {
  const crednetial = await getCredentials();
  const res = await fetch(`${BASE_URL}/inventory/car-views/`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${crednetial.access}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ip_address: "192.168.1.1" }),
  });
  console.log(res);
  const data = await res.json();
  console.log(data);
}

export async function makeCarFavorite(id: number) {
  const credential = await getCredentials();
  try {
    const res = await fetch(`${BASE_URL}/inventory/car-favorites/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${credential.access}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ car: id }),
    });
    if (!res.ok) throw new Error(`Something went wrong`);
  } catch (err) {
    throw err;
  }
}

export async function carFavorites() {
  const credential = await getCredentials();
  try {
    const res = await fetch(`${BASE_URL}/inventory/car-favorites/`, {
      headers: {
        Authorization: `Bearer ${credential.access}`,
      },
    });
    if (!res.ok) throw new Error("Error fetching favorite cars.");
    const data: Favorite[] = await res.json();
    return data;
  } catch (err) {
    throw err;
  }
}

export async function removeCarFavorite(id: number) {
  const credential = await getCredentials();
  try {
    const res = await fetch(`${BASE_URL}/inventory/car-favorites/${id}/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${credential.access}`,
      },
    });
    if (!res.ok) throw new Error("Error removing favorite car.");
    return { success: true, id };
  } catch (err) {
    throw err;
  }
}
