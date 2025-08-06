'use client'

import Image from "next/image"
import Link from "next/link"
import { Heart, Star, ShoppingBag } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/contexts/cart-context"
import { useWishlist } from "@/contexts/wishlist-context"
import { useToast } from "@/hooks/use-toast"

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  badge?: string
  rating?: number
  reviews?: number
}

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist()
  const { toast } = useToast()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price)
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    })
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.name} đã được thêm vào giỏ hàng của bạn.`,
    })
  }

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault()
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
        image: product.image,
        originalPrice: product.originalPrice
      })
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `${product.name} đã được thêm vào danh sách yêu thích.`,
      })
    }
  }

  return (
    <Card className="group relative">
      <CardContent className="p-0">
        <Link href={`/products/${product.id}`}>
          <div className="relative overflow-hidden">
            <Image
              src={product.image || "/placeholder.svg"}
              alt={product.name}
              width={300}
              height={400}
              className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-300"
            />
            {product.badge && (
              <Badge 
                className={`absolute top-2 left-2 ${
                  product.badge === 'SOLD OUT' 
                    ? 'bg-gray-800 text-white' 
                    : product.badge === 'SALE'
                    ? 'bg-red-600 text-white'
                    : 'bg-green-600 text-white'
                }`}
              >
                {product.badge}
              </Badge>
            )}
            
            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                isInWishlist(product.id) ? 'text-red-500' : 'text-gray-600'
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </Button>

            {/* Quick Add to Cart */}
            <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button 
                className="w-full bg-white text-black hover:bg-gray-100"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="h-4 w-4 mr-2" />
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        </Link>
        
        <div className="p-4">
          <Link href={`/products/${product.id}`}>
            <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-gray-600">
              {product.name}
            </h3>
          </Link>
          
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>

          {product.rating && (
            <div className="flex items-center space-x-1">
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-3 w-3 ${
                      i < Math.floor(product.rating!) ? 'fill-current' : ''
                    }`} 
                  />
                ))}
              </div>
              <span className="text-xs text-gray-500">
                ({product.reviews} đánh giá)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
