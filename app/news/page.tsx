'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Calendar, User, Eye, Search } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Header } from "@/components/header"

interface NewsArticle {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  category: string
  author: string
  publishDate: string
  views: number
  featured: boolean
  tags: string[]
}

export default function NewsPage() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('newest')

  const mockArticles: NewsArticle[] = [
    {
      id: "1",
      title: "Xu hướng thời trang Thu Đông 2024: Sự trở lại của phong cách cổ điển",
      excerpt: "Khám phá những xu hướng thời trang mới nhất cho mùa Thu Đông 2024 với những gam màu ấm áp và chất liệu cao cấp. Phong cách cổ điển đang có sự trở lại mạnh mẽ.",
      content: "Nội dung chi tiết về xu hướng thời trang...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Xu hướng",
      author: "Nguyễn Thị Mai",
      publishDate: "2024-01-15",
      views: 1250,
      featured: true,
      tags: ["thời trang", "xu hướng", "thu đông", "2024"]
    },
    {
      id: "2",
      title: "Bí quyết phối đồ công sở thanh lịch cho phụ nữ hiện đại",
      excerpt: "Hướng dẫn chi tiết cách phối đồ công sở chuyên nghiệp và thanh lịch. Từ việc chọn màu sắc đến cách kết hợp phụ kiện một cách tinh tế.",
      content: "Nội dung chi tiết về phối đồ công sở...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Phong cách",
      author: "Trần Văn Minh",
      publishDate: "2024-01-12",
      views: 980,
      featured: false,
      tags: ["công sở", "phối đồ", "thanh lịch", "chuyên nghiệp"]
    },
    {
      id: "3",
      title: "Bộ sưu tập mới: Elegant Evening - Vẻ đẹp của đêm tiệc",
      excerpt: "Ra mắt bộ sưu tập Elegant Evening với những thiết kế dạ hội sang trọng và quyến rũ. Mỗi thiết kế đều mang trong mình câu chuyện riêng.",
      content: "Nội dung chi tiết về bộ sưu tập...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Bộ sưu tập",
      author: "Lê Thị Hương",
      publishDate: "2024-01-10",
      views: 1580,
      featured: true,
      tags: ["bộ sưu tập", "dạ hội", "sang trọng", "elegant evening"]
    },
    {
      id: "4",
      title: "Chăm sóc và bảo quản quần áo cao cấp đúng cách",
      excerpt: "Những mẹo hay để bảo quản quần áo cao cấp, giúp sản phẩm luôn như mới và bền đẹp theo thời gian. Từ cách giặt đến cách cất giữ.",
      content: "Nội dung chi tiết về bảo quản quần áo...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Mẹo hay",
      author: "Phạm Thị Lan",
      publishDate: "2024-01-08",
      views: 750,
      featured: false,
      tags: ["bảo quản", "chăm sóc", "quần áo cao cấp", "mẹo hay"]
    },
    {
      id: "5",
      title: "Màu sắc trong thời trang: Tâm lý học và cách ứng dụng",
      excerpt: "Tìm hiểu về tâm lý học màu sắc trong thời trang và cách sử dụng màu sắc để thể hiện cá tính, tạo ấn tượng trong giao tiếp.",
      content: "Nội dung chi tiết về màu sắc trong thời trang...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Kiến thức",
      author: "Hoàng Văn Nam",
      publishDate: "2024-01-05",
      views: 1120,
      featured: false,
      tags: ["màu sắc", "tâm lý học", "cá tính", "thời trang"]
    },
    {
      id: "6",
      title: "Thời trang bền vững: Xu hướng tương lai của ngành công nghiệp",
      excerpt: "Khám phá xu hướng thời trang bền vững đang ngày càng được quan tâm. Từ chất liệu thân thiện môi trường đến quy trình sản xuất có trách nhiệm.",
      content: "Nội dung chi tiết về thời trang bền vững...",
      image: "/placeholder.svg?height=300&width=400",
      category: "Xu hướng",
      author: "Nguyễn Thị Hoa",
      publishDate: "2024-01-03",
      views: 890,
      featured: true,
      tags: ["bền vững", "môi trường", "xu hướng", "tương lai"]
    }
  ]

  const categories = ["Tất cả", "Xu hướng", "Phong cách", "Bộ sưu tập", "Mẹo hay", "Kiến thức"]

  useEffect(() => {
    setArticles(mockArticles)
    setFilteredArticles(mockArticles)
  }, [])

  useEffect(() => {
    let filtered = articles.filter(article => {
      const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           article.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      
      const matchesCategory = selectedCategory === 'all' || 
                             selectedCategory === 'Tất cả' || 
                             article.category === selectedCategory

      return matchesSearch && matchesCategory
    })

    // Sort articles
    switch (sortBy) {
      case 'oldest':
        filtered.sort((a, b) => new Date(a.publishDate).getTime() - new Date(b.publishDate).getTime())
        break
      case 'popular':
        filtered.sort((a, b) => b.views - a.views)
        break
      case 'newest':
      default:
        filtered.sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
        break
    }

    setFilteredArticles(filtered)
  }, [articles, searchQuery, selectedCategory, sortBy])

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

  const featuredArticles = filteredArticles.filter(article => article.featured).slice(0, 3)
  const regularArticles = filteredArticles.filter(article => !article.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">Tin tức & Xu hướng</h1>
          <p className="text-gray-600 max-w-2xl">
            Cập nhật những xu hướng thời trang mới nhất, bí quyết phối đồ và kiến thức hữu ích từ các chuyên gia
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
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Chọn danh mục" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map(category => (
                    <SelectItem key={category} value={category === 'Tất cả' ? 'all' : category}>
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
                <Card key={article.id} className={`group cursor-pointer ${index === 0 ? 'lg:col-span-2 lg:row-span-2' : ''}`}>
                  <CardContent className="p-0">
                    <Link href={`/news/${article.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
                          alt={article.title}
                          width={index === 0 ? 600 : 300}
                          height={index === 0 ? 400 : 200}
                          className={`object-cover w-full group-hover:scale-105 transition-transform duration-300 ${
                            index === 0 ? 'h-64 lg:h-80' : 'h-48'
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
                          <h3 className={`font-semibold mb-2 line-clamp-2 ${
                            index === 0 ? 'text-xl lg:text-2xl' : 'text-lg'
                          }`}>
                            {article.title}
                          </h3>
                          {index === 0 && (
                            <p className="text-sm text-gray-200 line-clamp-2 mb-3">
                              {article.excerpt}
                            </p>
                          )}
                          <div className="flex items-center space-x-4 text-xs text-gray-300">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(article.publishDate)}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Eye className="h-3 w-3" />
                              <span>{formatViews(article.views)}</span>
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
              <Button onClick={() => {
                setSearchQuery('')
                setSelectedCategory('all')
              }}>
                Xóa bộ lọc
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {regularArticles.map((article) => (
                <Card key={article.id} className="group cursor-pointer">
                  <CardContent className="p-0">
                    <Link href={`/news/${article.id}`}>
                      <div className="relative overflow-hidden">
                        <Image
                          src={article.image || "/placeholder.svg"}
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
                          {article.excerpt}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-1">
                              <User className="h-3 w-3" />
                              <span>{article.author}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Calendar className="h-3 w-3" />
                              <span>{formatDate(article.publishDate)}</span>
                            </div>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Eye className="h-3 w-3" />
                            <span>{formatViews(article.views)}</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-1 mt-3">
                          {article.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
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

        {/* Pagination */}
        {filteredArticles.length > 0 && (
          <div className="flex justify-center">
            <div className="flex space-x-2">
              <Button variant="outline" disabled>Trước</Button>
              <Button variant="default">1</Button>
              <Button variant="outline">2</Button>
              <Button variant="outline">3</Button>
              <Button variant="outline">Sau</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
