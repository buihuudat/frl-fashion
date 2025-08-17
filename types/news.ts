export interface NewsType {
  _id: string;
  thumbnail: string;
  title: string;
  category: string;
  author: {
    _id: string;
    username: string;
    avatar: string;
    fullname: {
      firstname: string;
      lastname: string;
    };
  };
  tags: Array<{
    _id: string;
    name: string;
  }>;
  content: string;
  viewCount: number;
  likeCount: any[]; // có thể định nghĩa cụ thể nếu biết cấu trúc
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface NewsListResponse {
  newsList: NewsType[];
  page: number;
  perPage: number;
  totalNews: number;
}
