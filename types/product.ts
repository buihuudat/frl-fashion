export interface Product {
  _id: string;
  title: string;
  description: string;
  images: string[];
  price: number;
  discount: number;
  averageStarRating: number;
  category: string;
  unit: string;
  tags: {
    name: string;
    _id: string;
  }[];
  status: boolean;
  quantity: number;
  sold: number;
  brand: string;
  shop: {
    _id: string;
    name: string;
    user: {
      _id: string;
      avatar: string;
    };
  };
  favorites: any[]; // Can be refined if structure is known
  comments: any[]; // Can be refined if structure is known
  views: number;
  lastPrice: number;
  currentQuantity: number;
  createdAt: string; // or Date, depending on usage
  updatedAt: string; // or Date
  __v: number;
}
