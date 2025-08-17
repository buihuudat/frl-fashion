"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Calendar,
  Eye,
  Share2,
  Heart,
  ArrowLeft,
  Tag,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/header";
import { getNews, getNewsById } from "@/services/useNews";

interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: {
    fullname: string;
    username: string;
    avatar?: string;
    bio?: string;
  };
  createdAt: string;
  viewCount: number;
  likeCount: string[];
  comments: Comment[];
  tags: { name: string }[];
  readTime?: number;
}

interface Comment {
  id: string;
  user: string;
  avatar: string;
  content: string;
  date: string;
  likes: number;
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [listnews, setListnews] = useState([]);

  const createExcerpt = (htmlContent: string, maxLength = 150) => {
    const textContent = htmlContent.replace(/<[^>]*>/g, "");
    return textContent.length > maxLength
      ? textContent.substring(0, maxLength) + "..."
      : textContent;
  };

  const getAuthorName = (author: NewsArticle["author"]) => {
    return `${author.fullname.firstname} ${author.fullname.lastname}`;
  };

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getNewsById(params?.title);
        setArticle(response);
        setIsLoading(false);

        const dataListNews = await getNews();
        setListnews(dataListNews.newsList);
      } catch (error) {
        console.error("Error fetching article:", error);
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [params.id]);

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

  const handleLike = () => {
    setIsLiked(!isLiked);
    if (article) {
      const newLikeCount = isLiked
        ? article.likeCount.filter((id) => id !== "current-user")
        : [...article.likeCount, "current-user"];

      setArticle({
        ...article,
        likeCount: newLikeCount,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // You could show a toast here
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-8 rounded mb-4"></div>
            <div className="bg-gray-300 h-64 rounded mb-6"></div>
            <div className="space-y-3">
              <div className="bg-gray-300 h-4 rounded"></div>
              <div className="bg-gray-300 h-4 rounded"></div>
              <div className="bg-gray-300 h-4 rounded w-3/4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy bài viết</h1>
            <Link href="/news">
              <Button>Quay lại danh sách tin tức</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  console.log({ article });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Link href="/news">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại tin tức
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-8">
          <div className="relative">
            <Image
              src={article.thumbnail || "/placeholder.svg"}
              alt={article.title}
              width={800}
              height={400}
              className="w-full h-64 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <Badge className="absolute top-4 left-4 bg-white text-black">
              {article.category}
            </Badge>
          </div>

          <div className="p-6 md:p-8">
            <h1 className="text-3xl md:text-4xl font-light mb-4 leading-tight">
              {article.title}
            </h1>

            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {article.excerpt}
            </p>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={article.author.avatar || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {article?.author?.fullname?.lastname}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">
                    {article.author.fullname?.lastname}
                  </p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.createdAt)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatViews(article.viewCount)} lượt xem</span>
                    </div>
                    <span>{article.readTime || 5} phút đọc</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? "text-red-500 border-red-500" : ""}
                >
                  <Heart
                    className={`h-4 w-4 mr-1 ${isLiked ? "fill-current" : ""}`}
                  />
                  {article.likeCount.length}
                </Button>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-1" />
                  Chia sẻ
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Article Content */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <div
            className="prose prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="mt-8 pt-6 border-t">
            <div className="flex items-center space-x-2 mb-4">
              <Tag className="h-4 w-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {article.tags.map((tag, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="cursor-pointer hover:bg-gray-100"
                >
                  {tag.name}
                </Badge>
              ))}
            </div>
          </div>
        </div>

        {/* Author Bio */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h3 className="text-lg font-semibold mb-4">Về tác giả</h3>
          <div className="flex items-start space-x-4">
            <Avatar className="h-16 w-16">
              <AvatarImage src={article.author.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {article?.author?.fullname?.lastname || "Admin"}
              </AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold mb-2">
                {article.author.fullname?.lastname || "Admin"}
              </h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {article.author.bio ||
                  "Chuyên gia thời trang với nhiều năm kinh nghiệm trong ngành."}
              </p>
            </div>
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-semibold mb-6">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {listnews?.map((article, index) => (
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
                        width={300}
                        height={200}
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
      </div>
    </div>
  );
}
