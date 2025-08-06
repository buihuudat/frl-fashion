'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Eye, Share2, Heart, MessageCircle, ArrowLeft, Tag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Header } from "@/components/header"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  authorAvatar: string
  authorBio: string
  publishDate: string
  views: number
  likes: number
  comments: Comment[]
  tags: string[]
  readTime: number
}

interface Comment {
  id: string
  user: string
  avatar: string
  content: string
  date: string
  likes: number
}

export default function NewsDetailPage({ params }: { params: { id: string } }) {
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [isLiked, setIsLiked] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  const mockArticle: NewsArticle = {
    id: params.id,
    title: "Xu hướng thời trang Thu Đông 2024: Sự trở lại của phong cách cổ điển",
    excerpt: "Khám phá những xu hướng thời trang mới nhất cho mùa Thu Đông 2024 với những gam màu ấm áp và chất liệu cao cấp. Phong cách cổ điển đang có sự trở lại mạnh mẽ.",
    content: `
      <p>Mùa Thu Đông 2024 đánh dấu sự trở lại mạnh mẽ của phong cách cổ điển trong thời trang. Từ các sàn diễn thời trang hàng đầu thế giới đến street style, chúng ta có thể thấy rõ xu hướng này đang được ưa chuộng.</p>

      <h2>Gam màu chủ đạo</h2>
      <p>Các gam màu ấm áp như nâu camel, xanh navy sâu, và đỏ burgundy đang thống trị bảng màu Thu Đông năm nay. Những màu sắc này không chỉ mang lại cảm giác ấm cúng mà còn dễ dàng phối hợp với nhau.</p>

      <h2>Chất liệu cao cấp</h2>
      <p>Len cashmere, lụa tơ tằm, và tweed là những chất liệu được ưa chuộng nhất. Chúng không chỉ mang lại sự thoải mái mà còn thể hiện đẳng cấp và phong cách tinh tế.</p>

      <h2>Những item không thể thiếu</h2>
      <ul>
        <li>Áo khoác dáng dài (Long coat)</li>
        <li>Áo len cổ lọ</li>
        <li>Chân váy midi</li>
        <li>Boots cao cổ</li>
        <li>Túi xách structured</li>
      </ul>

      <h2>Cách phối đồ hiệu quả</h2>
      <p>Để tạo nên một outfit hoàn hảo theo xu hướng này, hãy kết hợp các item cổ điển với những chi tiết hiện đại. Ví dụ, một chiếc áo khoác tweed cổ điển có thể được phối cùng quần jeans skinny và boots ankle hiện đại.</p>

      <p>Phong cách cổ điển không có nghĩa là lỗi thời. Ngược lại, nó thể hiện sự tinh tế, thanh lịch và vượt thời gian. Đây chính là lý do tại sao xu hướng này luôn được yêu thích và trở lại mạnh mẽ trong mùa Thu Đông 2024.</p>
    `,
    image: "/placeholder.svg?height=400&width=800",
    category: "Xu hướng",
    author: "Nguyễn Thị Mai",
    authorAvatar: "/placeholder.svg?height=60&width=60",
    authorBio: "Chuyên gia thời trang với hơn 10 năm kinh nghiệm trong ngành. Từng làm việc tại các tạp chí thời trang hàng đầu và có nhiều bài viết được đánh giá cao.",
    publishDate: "2024-01-15",
    views: 1250,
    likes: 89,
    readTime: 5,
    tags: ["thời trang", "xu hướng", "thu đông", "2024", "phong cách cổ điển"],
    comments: [
      {
        id: "1",
        user: "Trần Thị Lan",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Bài viết rất hay và chi tiết! Mình đã áp dụng một số gợi ý và thấy rất phù hợp. Cảm ơn tác giả đã chia sẻ.",
        date: "2024-01-16",
        likes: 5
      },
      {
        id: "2",
        user: "Lê Văn Minh",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Xu hướng cổ điển thực sự rất hấp dẫn. Tuy nhiên, có thể chia sẻ thêm về cách phối đồ cho nam giới không ạ?",
        date: "2024-01-16",
        likes: 3
      },
      {
        id: "3",
        user: "Phạm Thị Hoa",
        avatar: "/placeholder.svg?height=40&width=40",
        content: "Những gam màu được đề cập trong bài rất đẹp. Mình đặc biệt thích màu nâu camel, rất sang trọng và dễ phối đồ.",
        date: "2024-01-17",
        likes: 7
      }
    ]
  }

  const relatedArticles = [
    {
      id: "2",
      title: "Bí quyết phối đồ công sở thanh lịch",
      image: "/placeholder.svg?height=200&width=300",
      category: "Phong cách",
      publishDate: "2024-01-12"
    },
    {
      id: "3",
      title: "Bộ sưu tập mới: Elegant Evening",
      image: "/placeholder.svg?height=200&width=300",
      category: "Bộ sưu tập",
      publishDate: "2024-01-10"
    },
    {
      id: "4",
      title: "Chăm sóc và bảo quản quần áo cao cấp",
      image: "/placeholder.svg?height=200&width=300",
      category: "Mẹo hay",
      publishDate: "2024-01-08"
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setArticle(mockArticle)
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const formatViews = (views: number) => {
    if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}k`
    }
    return views.toString()
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    if (article) {
      setArticle({
        ...article,
        likes: isLiked ? article.likes - 1 : article.likes + 1
      })
    }
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: article?.title,
        text: article?.excerpt,
        url: window.location.href,
      })
    } else {
      navigator.clipboard.writeText(window.location.href)
      // You could show a toast here
    }
  }

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
    )
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
    )
  }

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
              src={article.image || "/placeholder.svg"}
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
                  <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
                  <AvatarFallback>{article.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold">{article.author}</p>
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(article.publishDate)}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{formatViews(article.views)} lượt xem</span>
                    </div>
                    <span>{article.readTime} phút đọc</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLike}
                  className={isLiked ? 'text-red-500 border-red-500' : ''}
                >
                  <Heart className={`h-4 w-4 mr-1 ${isLiked ? 'fill-current' : ''}`} />
                  {article.likes}
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
              {article.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-100">
                  {tag}
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
              <AvatarImage src={article.authorAvatar || "/placeholder.svg"} />
              <AvatarFallback>{article.author[0]}</AvatarFallback>
            </Avatar>
            <div>
              <h4 className="font-semibold mb-2">{article.author}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">
                {article.authorBio}
              </p>
            </div>
          </div>
        </div>

        {/* Comments */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8 mb-8">
          <h3 className="text-lg font-semibold mb-6">
            Bình luận ({article.comments.length})
          </h3>
          
          <div className="space-y-6">
            {article.comments.map((comment) => (
              <div key={comment.id} className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={comment.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{comment.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h4 className="font-semibold">{comment.user}</h4>
                    <span className="text-sm text-gray-500">
                      {formatDate(comment.date)}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-2">{comment.content}</p>
                  <button className="text-sm text-gray-500 hover:text-gray-700 flex items-center space-x-1">
                    <Heart className="h-3 w-3" />
                    <span>{comment.likes}</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related Articles */}
        <div className="bg-white rounded-lg shadow-sm p-6 md:p-8">
          <h3 className="text-lg font-semibold mb-6">Bài viết liên quan</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedArticles.map((relatedArticle) => (
              <Card key={relatedArticle.id} className="group cursor-pointer">
                <CardContent className="p-0">
                  <Link href={`/news/${relatedArticle.id}`}>
                    <div className="relative overflow-hidden">
                      <Image
                        src={relatedArticle.image || "/placeholder.svg"}
                        alt={relatedArticle.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-32 group-hover:scale-105 transition-transform duration-300"
                      />
                      <Badge className="absolute top-2 left-2 bg-white text-black text-xs">
                        {relatedArticle.category}
                      </Badge>
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold text-sm line-clamp-2 group-hover:text-gray-600">
                        {relatedArticle.title}
                      </h4>
                      <p className="text-xs text-gray-500 mt-2">
                        {formatDate(relatedArticle.publishDate)}
                      </p>
                    </div>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
