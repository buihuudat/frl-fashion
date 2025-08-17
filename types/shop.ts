export interface ShopUserType {
  _id: string;
  email: string;
  phone: string;
  username: string;
  avatar: string;
  fullname: {
    firstname: string;
    lastname: string;
  };
}

export interface ShopType {
  _id: string;
  user: ShopUserType;
  name: string;
  description: string;
  bio: string;
  startYear: number;
  products: any[]; // Có thể thay bằng ProductType[] nếu bạn đã định nghĩa
  averageStarRating: number;
  followers: string[]; // hoặc: UserType[] nếu muốn dùng dữ liệu user đầy đủ
  ratings: any[]; // Có thể thay bằng RatingType[] nếu đã có
  createdAt: string;
  updatedAt: string;
  __v: number;
}
