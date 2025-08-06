'use client'

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag, Share2, Minus, Plus, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"

interface ProductDetail {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  description: string
  category: string
  brand: string
  rating: number
  reviews: Review[]
  colors: Color[]
  sizes: Size[]
  features: string[]
  materials: string
  careInstructions: string[]
  inStock: boolean
  stockCount: number
}

interface Review {
  id: string
  user: string
  avatar: string
  rating: number
  comment: string
  date: string
  helpful: number
}

interface Color {
  name: string
  value: string
  image: string
}

interface Size {
  name: string
  available: boolean
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<ProductDetail | null>(null)
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [selectedColor, setSelectedColor] = useState<Color | null>(null)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isLoading, setIsLoading] = useState(true)

  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const mockProduct: ProductDetail = {
    id: params.id,
    name: "Áo sơ mi lụa cao cấp",
    price: 1200000,
    originalPrice: 1500000,
    images: [
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500",
      "/placeholder.svg?height=600&width=500"
    ],
    description: "Áo sơ mi lụa cao cấp được thiết kế với chất liệu lụa tơ tằm 100% nhập khẩu từ Ý. Thiết kế thanh lịch, phù hợp cho cả môi trường công sở và các dịp trang trọng. Đường may tinh tế, form dáng ôm vừa vặn tôn lên vóc dáng người mặc.",
    category: "Áo sơ mi",
    brand: "Luxe Collection",
    rating: 4.8,
    reviews: [
      {
        id: "1",
        user: "Nguyễn Thị Lan",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 5,
        comment: "Chất lượng tuyệt vời, vải mềm mại và form dáng rất đẹp. Mình rất hài lòng với sản phẩm này.",
        date: "2024-01-15",
        helpful: 12
      },
      {
        id: "2",
        user: "Trần Minh Anh",
        avatar: "/placeholder.svg?height=40&width=40",
        rating: 4,
        comment: "Sản phẩm đẹp, chất lượng tốt. Tuy nhiên giá hơi cao so với mặt bằng chung.",
        date: "2024-01-10",
        helpful: 8
      }
    ],
    colors: [
      { name: "Trắng", value: "#FFFFFF", image: "/placeholder.svg?height=600&width=500" },
      { name: "Đen", value: "#000000", image: "/placeholder.svg?height=600&width=500" },
      { name: "Xanh navy", value: "#1e3a8a", image: "/placeholder.svg?height=600&width=500" }
    ],
    sizes: [
      { name: "S", available: true },
      { name: "M", available: true },
      { name: "L", available: true },
      { name: "XL", available: false }
    ],
    features: [
      "Chất liệu lụa tơ tằm 100%",
      "Thiết kế thanh lịch, sang trọng",
      "Form dáng ôm vừa vặn",
      "Đường may tinh tế",
      "Phù hợp nhiều dịp"
    ],
    materials: "Lụa tơ tằm 100% nhập khẩu từ Ý",
    careInstructions: [
      "Giặt tay với nước lạnh",
      "Không sử dụng chất tẩy",
      "Phơi trong bóng râm",
      "Ủi ở nhiệt độ thấp",
      "Bảo quản nơi khô ráo"
    ],
    inStock: true,
    stockCount: 15
  }

  const relatedProducts = [
    {
      id: "2",
      name: "Áo sơ mi cotton premium",
      price: 890000,
      image: "/placeholder.svg?height=400&width=300",
      rating: 4.6,
      reviews: 89
    },
    {
      id: "3",
      name: "Áo sơ mi linen thanh lịch",
      price: 750000,
      image: "/placeholder.svg?height=400&width=300",
      rating: 4.5,
      reviews: 67
    },
    {
      id: "4",
      name: "Áo sơ mi silk blend",
      price: 1100000,
      image: "/placeholder.svg?height=400&width=300",
      rating: 4.7,
      reviews: 92
    },
    {
      id: "5",
      name: "Áo sơ mi chiffon",
      price: 650000,
      image: "/placeholder.svg?height=400&width=300",
      rating: 4.4,
      reviews: 54
    }
  ]

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct(mockProduct)
      setSelectedColor(mockProduct.colors[0])
      setSelectedSize(mockProduct.sizes[0])
      setIsLoading(false)
    }, 1000)
  }, [params.id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = () => {
    if (!product || !selectedColor || !selectedSize) return

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      color: selectedColor.name,
      size: selectedSize.name
    })

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} (${selectedColor.name}, ${selectedSize.name}) đã được thêm vào giỏ hàng.`,
    })
  }

  const handleToggleWishlist = () => {
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `${product.name} đã được xóa khỏi danh sách yêu thích.`,
      })
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        originalPrice: product.originalPrice
      })
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `${product.name} đã được thêm vào danh sách yêu thích.`,
      })
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-300 h-8 rounded"></div>
                <div className="bg-gray-300 h-6 rounded w-1/2"></div>
                <div className="bg-gray-300 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <Link href="/products">
              <Button>Quay lại danh sách sản phẩm</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">Trang chủ</Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">Sản phẩm</Link>
            <span>/</span>
            <Link href={`/products?category=${product.category}`} className="hover:text-gray-900">
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.name}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.images[selectedImageIndex] || "/placeholder.svg"}
                alt={product.name}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.originalPrice && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                  -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart className={`h-5 w-5 ${isInWishlist(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
              </Button>
            </div>
            
            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index ? 'border-black' : 'border-gray-200'
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                {product.inStock ? (
                  <Badge className="bg-green-100 text-green-800">Còn hàng</Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Hết hàng</Badge>
                )}
              </div>
              <h1 className="text-3xl font-light mb-4">{product.name}</h1>
              
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? 'fill-current' : ''
                        }`} 
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating} ({product.reviews.length} đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-red-600">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Color Selection */}
            <div>
              <h3 className="font-semibold mb-3">Màu sắc: {selectedColor?.name}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor?.name === color.name ? 'border-black' : 'border-gray-300'
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div>

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Kích thước: {selectedSize?.name}</h3>
              <div className="flex space-x-2">
                {product.sizes.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => size.available && setSelectedSize(size)}
                    disabled={!size.available}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize?.name === size.name
                        ? 'border-black bg-black text-white'
                        : size.available
                        ? 'border-gray-300 hover:border-gray-400'
                        : 'border-gray-200 text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Số lượng</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                    disabled={quantity >= product.stockCount}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.stockCount} sản phẩm có sẵn)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button 
                className="w-full" 
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.inStock || !selectedColor || !selectedSize}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <div className="flex space-x-3">
                <Button variant="outline" className="flex-1">
                  Mua ngay
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Features */}
            <div>
              <h3 className="font-semibold mb-3">Đặc điểm nổi bật</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-sm text-gray-600">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-3"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả chi tiết</TabsTrigger>
              <TabsTrigger value="reviews">Đánh giá ({product.reviews.length})</TabsTrigger>
              <TabsTrigger value="care">Hướng dẫn bảo quản</TabsTrigger>
            </TabsList>
            
            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-4">Thông tin sản phẩm</h3>
                    <p className="mb-4">{product.description}</p>
                    
                    <h4 className="font-semibold mb-2">Chất liệu:</h4>
                    <p className="mb-4">{product.materials}</p>
                    
                    <h4 className="font-semibold mb-2">Đặc điểm:</h4>
                    <ul className="list-disc list-inside space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-3xl font-bold">{product.rating}</div>
                      <div>
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star 
                              key={i} 
                              className={`h-4 w-4 ${
                                i < Math.floor(product.rating) ? 'fill-current' : ''
                              }`} 
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">{product.reviews.length} đánh giá</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <span className="text-sm w-8">{star}★</span>
                          <Progress value={star === 5 ? 70 : star === 4 ? 20 : 10} className="flex-1" />
                          <span className="text-sm text-gray-600 w-8">
                            {star === 5 ? '70%' : star === 4 ? '20%' : '10%'}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {product.reviews.map((review) => (
                      <div key={review.id} className="border-b pb-6 last:border-b-0">
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage src={review.avatar || "/placeholder.svg"} />
                            <AvatarFallback>{review.user[0]}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">{review.user}</h4>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`h-3 w-3 ${
                                      i < review.rating ? 'fill-current' : ''
                                    }`} 
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('vi-VN')}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">{review.comment}</p>
                            <button className="text-sm text-gray-500 hover:text-gray-700">
                              Hữu ích ({review.helpful})
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Hướng dẫn bảo quản</h3>
                  <ul className="space-y-3">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-light mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
