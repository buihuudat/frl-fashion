'use client'

import { useState } from "react"
import Image from "next/image"
import { X, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Header } from "@/components/header"
import { ProductCard } from "@/components/product-card"

interface CompareProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  material: string
  sizes: string[]
  colors: string[]
  features: string[]
}

export default function ComparePage() {
  const [compareProducts, setCompareProducts] = useState<CompareProduct[]>([
    {
      id: "1",
      name: "Áo sơ mi lụa cao cấp",
      price: 1200000,
      originalPrice: 1500000,
      image: "/placeholder.svg?height=300&width=250",
      rating: 4.8,
      reviews: 124,
      material: "Lụa tơ tằm 100%",
      sizes: ["S", "M", "L", "XL"],
      colors: ["Trắng", "Đen", "Xanh navy"],
      features: ["Chống nhăn", "Thoáng khí", "Dễ giặt", "Không phai màu"]
    },
    {
      id: "2",
      name: "Áo sơ mi cotton premium",
      price: 890000,
      image: "/placeholder.svg?height=300&width=250",
      rating: 4.6,
      reviews: 89,
      material: "Cotton organic 100%",
      sizes: ["XS", "S", "M", "L"],
      colors: ["Trắng", "Hồng pastel", "Xám"],
      features: ["Thân thiện môi trường", "Mềm mại", "Thấm hút tốt"]
    }
  ])

  const suggestedProducts = [
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
    }
  ]

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const removeProduct = (id: string) => {
    setCompareProducts(prev => prev.filter(product => product.id !== id))
  }

  const addProduct = (product: any) => {
    if (compareProducts.length < 4) {
      const newProduct: CompareProduct = {
        ...product,
        material: "Cotton blend",
        sizes: ["S", "M", "L"],
        colors: ["Trắng", "Đen"],
        features: ["Chất lượng cao", "Thiết kế hiện đại"]
      }
      setCompareProducts(prev => [...prev, newProduct])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">So sánh sản phẩm</h1>
          <p className="text-gray-600">
            So sánh chi tiết các sản phẩm để đưa ra lựa chọn tốt nhất cho bạn
          </p>
        </div>

        {compareProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">Chưa có sản phẩm nào để so sánh</p>
            <Button>Thêm sản phẩm</Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {compareProducts.map((product) => (
                  <Card key={product.id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                      onClick={() => removeProduct(product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                    
                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          width={200}
                          height={250}
                          className="mx-auto rounded-lg object-cover"
                        />
                      </div>
                      
                      <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Giá</h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-red-600">
                              {formatPrice(product.price)}
                            </span>
                            {product.originalPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.originalPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Đánh giá</h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">{product.rating}</span>
                            <span className="text-xs text-gray-500">({product.reviews} đánh giá)</span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Chất liệu</h4>
                          <p className="text-sm text-gray-600">{product.material}</p>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Size có sẵn</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.sizes.map((size) => (
                              <Badge key={size} variant="outline" className="text-xs">
                                {size}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Màu sắc</h4>
                          <div className="flex flex-wrap gap-1">
                            {product.colors.map((color) => (
                              <Badge key={color} variant="outline" className="text-xs">
                                {color}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">Tính năng</h4>
                          <ul className="text-xs text-gray-600 space-y-1">
                            {product.features.map((feature, index) => (
                              <li key={index} className="flex items-center">
                                <span className="w-1 h-1 bg-gray-400 rounded-full mr-2"></span>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        <Button className="w-full">Thêm vào giỏ hàng</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {compareProducts.length < 4 && (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="p-4 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">Thêm sản phẩm để so sánh</p>
                        <Button variant="outline">Chọn sản phẩm</Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-light mb-6">Sản phẩm gợi ý</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {suggestedProducts.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <Button
                  className="absolute top-2 left-2 bg-white text-black hover:bg-gray-100"
                  size="sm"
                  onClick={() => addProduct(product)}
                  disabled={compareProducts.length >= 4}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  So sánh
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
