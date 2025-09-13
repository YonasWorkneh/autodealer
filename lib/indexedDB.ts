// IndexedDB utility for storing car form data

const DB_NAME = "CarDealerDB";
const DB_VERSION = 1;
const STORE_NAME = "carForms";

export interface CarFormData {
  id?: number;
  make: number;
  model: number;
  year: string;
  mileage: string;
  engine: string;
  gearbox: string;
  bodyColor: string;
  interiorColor: string;
  fuelType: string;
  price: string;
  salesType: string;
  description: string;
  images: File[];
  createdAt: Date;
  updatedAt: Date;
}

class IndexedDBManager {
  private db: IDBDatabase | null = null;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onerror = () => {
        reject(new Error("Failed to open IndexedDB"));
      };

      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });

          // Create indexes for better querying
          store.createIndex("createdAt", "createdAt", { unique: false });
          store.createIndex("make", "make", { unique: false });
          store.createIndex("model", "model", { unique: false });
        }
      };
    });
  }

  async saveCarForm(
    formData: Omit<CarFormData, "id" | "createdAt" | "updatedAt">
  ): Promise<number> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      const dataToStore: CarFormData = {
        ...formData,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const request = store.add(dataToStore);

      request.onsuccess = () => {
        resolve(request.result as number);
      };

      request.onerror = () => {
        reject(new Error("Failed to save form data"));
      };
    });
  }

  async getAllCarForms(): Promise<CarFormData[]> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve form data"));
      };
    });
  }

  async getCarFormById(id: number): Promise<CarFormData | undefined> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(id);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(new Error("Failed to retrieve form data"));
      };
    });
  }

  async updateCarForm(
    id: number,
    formData: Partial<CarFormData>
  ): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);

      // First get the existing data
      const getRequest = store.get(id);

      getRequest.onsuccess = () => {
        const existingData = getRequest.result;
        if (!existingData) {
          reject(new Error("Form data not found"));
          return;
        }

        const updatedData = {
          ...existingData,
          ...formData,
          updatedAt: new Date(),
        };

        const putRequest = store.put(updatedData);

        putRequest.onsuccess = () => {
          resolve();
        };

        putRequest.onerror = () => {
          reject(new Error("Failed to update form data"));
        };
      };

      getRequest.onerror = () => {
        reject(new Error("Failed to retrieve existing form data"));
      };
    });
  }

  async deleteCarForm(id: number): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.delete(id);

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to delete form data"));
      };
    });
  }

  async clearAllCarForms(): Promise<void> {
    if (!this.db) {
      await this.init();
    }

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction([STORE_NAME], "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.clear();

      request.onsuccess = () => {
        resolve();
      };

      request.onerror = () => {
        reject(new Error("Failed to clear form data"));
      };
    });
  }
}

// Create a singleton instance
export const indexedDBManager = new IndexedDBManager();

// Helper function to convert FormData to our interface
export function convertFormDataToCarForm(
  formData: FormData,
  images: File[]
): Omit<CarFormData, "id" | "createdAt" | "updatedAt"> {
  return {
    make: Number(formData.get("make")),
    model: Number(formData.get("model")),
    year: formData.get("year") as string,
    mileage: formData.get("mileage") as string,
    engine: formData.get("engine") as string,
    gearbox: formData.get("gearbox") as string,
    bodyColor: formData.get("bodyColor") as string,
    interiorColor: formData.get("interiorColor") as string,
    fuelType: formData.get("fuelType") as string,
    price: formData.get("price") as string,
    salesType: formData.get("salesType") as string,
    description: formData.get("description") as string,
    images: images,
  };
}
