export interface MarketData {
  car_summary: CarMarketData[];
}

export interface CarMarketData {
  car_make: string;
  car_model: string;
  average_price: number;
  total_cars: number;
  cheapest_car: {
    id: number;
    price: number;
    image_url: string;
  };
}
