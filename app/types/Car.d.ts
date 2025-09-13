export interface Car {
  id: number;
  dealer: number;
  broker: number;
  posted_by: number;
  images: CarImage[];
  bids: Bid[];
  verification_status: string;
  make_ref: number;
  model_ref: number;
  dealer_average_rating: number;
  broker_average_rating: number;
  make: string;
  model: string;
  year: number;
  price: string;
  mileage: number;
  fuel_type: string;
  status: string;
  sale_type: string;
  auction_end: string | null;
  priority: boolean;
  created_at: string;
  updated_at: string;
}

export interface Feature {
  id: string;
  label: string;
  checked: boolean;
}
