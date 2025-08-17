"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Calendar, User, Eye, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Header } from "@/components/header";
import { getNews } from "@/services/useNews";

interface NewsArticle {
  _id: string;
  title: string;
  content: string;
  thumbnail: string;
  category: string;
  author: {
    fullname: {
      firstname: string;
      lastname: string;
    };
    username: string;
    avatar: string;
  };
  tags: Array<{
    name: string;
    _id: string;
  }>;
  viewCount: number;
  likeCount: any[];
  createdAt: string;
  updatedAt: string;
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [loading, setLoading] = useState(true);

  const categories = ["Tất cả", "Quan", "Vay", "Ao", "Phu kien"];

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        const response = await getNews();
        if (response?.newsList) {
          setArticles(response.newsList);
          setFilteredArticles(response.newsList);
        }
      } catch (error) {
        console.error("Error fetching news:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  useEffect(() => {
    const filtered = articles.filter((article) => {
      const matchesSearch =
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.tags.some((tag) =>
          tag.name.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "all" ||
        selectedCategory === "Tất cả" ||
        article.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case "oldest":
        filtered.sort(
          (a, b) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
        break;
      case "popular":
        filtered.sort((a, b) => b.viewCount - a.viewCount);
        break;
      case "newest":
      default:
        filtered.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
    }

    setFilteredArticles(filtered);
  }, [articles, searchQuery, selectedCategory, sortBy]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("vi-VN", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`;
    }
    return views.toString();
  };

  const getAuthorName = (author: NewsArticle["author"]) => {
    return `${author.fullname.firstname} ${author.fullname.lastname}`;
  };

  const createExcerpt = (htmlContent: string, maxLength = 150) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  const featuredArticles = filteredArticles
    .filter(
      (article) =>
        article.viewCount > 0 || filteredArticles.indexOf(article) < 3
    )
    .slice(0, 3);
  const regularArticles = filteredArticles.filter(
    (article) =>
      !featuredArticles.some((featured) => featured._id === article._id)
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-2/3 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-lg overflow-hidden">
                  <div className="h-48 bg-gray-300"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-300 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">Tin tức & Xu hướng</h1>
          <p className="text-gray-600 max-w-2xl">
            Cập nhật những xu hướng thời trang mới nhất, bí quyết phối đồ và
            kiến thức hữu ích từ các chuyên gia
          </p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Tìm kiếm bài viết..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex gap-4">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem
                      key={category}
                      value={category === "Tất cả" ? "all" : category}
                    >
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Mới nhất</SelectItem>
                  <SelectItem value="oldest">Cũ nhất</SelectItem>
                  <SelectItem value="popular">Phổ biến nhất</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* Featured Articles */}
        {featuredArticles.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-light mb-6">Bài viết nổi bật</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {featuredArticles.map((article, index) => (
                <Card
                  key={article._id}
                  className={`group cursor-pointer ${
                    index === 0 ? "lg:col-span-2 lg:row-span-2" : ""
                  }`}
                >
                  <CardContent className="p-0">
                    <Link href={`/news/${article.title}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={article.thumbnail || "/placeholder.svg"}
                          alt={article.title}
                          width={index === 0 ? 600 : 300}
                          height={index === 0 ? 400 : 200}
                          className={`object-cover w-full group-hover:scale-105 transition-transform duration-300 ${
                            index === 0 ? "h-64 lg:h-80" : "h-48"
                          }`}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                          Nổi bật
                        </Badge>
                        <Badge className="absolute top-4 right-4 bg-white text-black">
                          {article.category}
                        </Badge>

                        <div className="absolute bottom-4 left-4 right-4 text-white">
                          <h3
                            className={`font-semibold mb-2 line-clamp-2 ${
                              index === 0 ? "text-xl lg:text-2xl" : "text-lg"
                            }`}
                          >
                            {article.title}
                          </h3>
                          {index === 0 && (
                            <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                              {createExcerpt(article.content)}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-300">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{getAuthorName(article.author)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(article.createdAt)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{formatViews(article.viewCount)}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Regular Articles */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light">Tất cả bài viết</h2>
            <span className="text-sm text-gray-600">
              {filteredArticles.length} bài viết
            </span>
          </div>

          {filteredArticles.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">Không tìm thấy bài viết nào</p>
              <Button
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
              >
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article._id} className="group cursor-pointer">
                  <CardContent className="p-0">
                    <Link href={`/news/${article.title}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={article.thumbnail || "/placeholder.svg"}
                          alt={article.title}
                          width={300}
                          height={200}
                          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                        />
                        <Badge className="absolute top-4 left-4 bg-white text-black">
                          {article.category}
                        </Badge>
                      </div>
                      <div className="p-6">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-gray-600">
                          {article.title}
                        </h3>
                        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                          {createExcerpt(article.content)}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{getAuthorName(article.author)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(article.createdAt)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatViews(article.viewCount)}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1 mt-3">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge
                              key={tag._id}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
