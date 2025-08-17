"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart, Star, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel";
import { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  mode: "vertical" | "horizontal";
}

export function ProductCard({ product, mode = "vertical" }: ProductCardProps) {
  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      ...product,
      id: product._id,
      name: product.title,
      price: product.price,
      image: product.images?.[0],
    });
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.title} đã được thêm vào giỏ hàng của bạn.`,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `${product.title} đã được xóa khỏi danh sách yêu thích.`,
      });
    } else {
      addToWishlist({
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.images?.[0],
        originalPrice: product.lastPrice,
      });
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `${product.title} đã được thêm vào danh sách yêu thích.`,
      });
    }
  };

  const isNewProduct =
    new Date(product.createdAt).getTime() >=
    Date.now() - 3 * 24 * 60 * 60 * 1000;

  const renderStars = () => {
    if (!+product?.averageStarRating) return;
    return (
      <div className="flex text-yellow-400">
        {[...Array(Math.round(product?.averageStarRating))].map((_, i) => (
          <Star key={i} className="h-3 w-3 fill-current" />
        ))}
      </div>
    );
  };

  if (mode === "horizontal") {
    return (
      <Card className="group flex flex-col sm:flex-row gap-4 overflow-hidden p-0">
        <Link
          href={{
            pathname: `/products/${product.title}`,
            query: { product: JSON.stringify(product) },
          }}
          className="flex-shrink-0"
        >
          <div className="relative w-full sm:w-56 h-56 sm:h-auto overflow-hidden">
            <Image
              src={product.images?.[0]}
              alt={product.title}
              width={224}
              height={224}
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            {isNewProduct && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                NEW
              </Badge>
            )}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                isInWishlist(product._id) ? "text-red-500" : "text-gray-600"
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(product._id) ? "fill-current" : ""
                }`}
              />
            </Button>
          </div>
        </Link>

        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <Badge className="mb-2" variant="outline">
              {product?.category}
            </Badge>
            <Link
              href={{
                pathname: `/products/${product?.title}`,
              }}
            >
              <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-gray-600 line-clamp-2">
                {product.title}
              </h3>
            </Link>

            <div className="flex items-center space-x-2 mb-2">
              <span className="text-lg font-semibold text-gray-900">
                {formatPrice(product.lastPrice)}
              </span>
              {product.price && (
                <span className="text-sm text-gray-500 line-through">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            {!!product.averageStarRating && (
              <div className="flex items-center space-x-1">
                {renderStars()}
                <span className="text-xs text-gray-500">
                  ({product.comments.length} đánh giá)
                </span>
              </div>
            )}
          </div>

          <Button className="mt-4 w-full sm:w-auto" onClick={handleAddToCart}>
            <ShoppingBag className="h-4 w-4 mr-2" />
            Thêm vào giỏ
          </Button>
        </div>
      </Card>
    );
  }

  // Fallback to vertical mode (original)
  return (
    <Card className="group relative p-0 overflow-hidden">
      <CardContent className="p-0">
        <Link
          href={{
            pathname: `/products/${product?.title}`,
          }}
        >
          <div className="relative overflow-hidden">
            <Carousel>
              <CarouselContent>
                {product?.images?.map((item) => (
                  <CarouselItem key={item}>
                    <Image
                      src={item}
                      alt={product.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-60 group-hover:scale-105 transition-transform duration-300 object-top"
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>

            {isNewProduct && (
              <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                NEW
              </Badge>
            )}

            {/* Wishlist Button */}
            <Button
              variant="ghost"
              size="icon"
              className={`absolute top-2 right-2 bg-white/80 hover:bg-white ${
                isInWishlist(product._id) ? "text-red-500" : "text-gray-600"
              }`}
              onClick={handleToggleWishlist}
            >
              <Heart
                className={`h-4 w-4 ${
                  isInWishlist(product._id) ? "fill-current" : ""
                }`}
              />
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

        <Badge className="m-2 mb-0" variant={"outline"}>
          {product?.category}
        </Badge>

        <div className="p-4">
          <Link
            href={{
              pathname: `/products/${product?.title}`,
            }}
          >
            <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-gray-600 line-clamp-2">
              {product.title}
            </h3>
          </Link>

          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-semibold text-gray-900">
              {formatPrice(product.lastPrice)}
            </span>
            {product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {!!product.averageStarRating && (
            <div className="flex items-center space-x-1">
              {renderStars()}
              <span className="text-xs text-gray-500">
                ({product.comments.length} đánh giá)
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
