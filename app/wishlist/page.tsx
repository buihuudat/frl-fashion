"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2, ShoppingBag, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { useWishlist } from "@/contexts/wishlist-context";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function WishlistPage() {
  const { items: wishlistItems, removeItem: removeFromWishlist } =
    useWishlist();
  const { addItem: addToCart } = useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeFromWishlist(id);
    toast({
      title: "Đã xóa khỏi danh sách yêu thích",
      description: `${name} đã được xóa khỏi danh sách yêu thích của bạn.`,
    });
  };

  const handleAddToCart = (item: {
    id: string;
    name: string;
    price: number;
    image: string;
    size?: string;
    color?: string;
  }) => {
    addToCart(item);
    removeFromWishlist(item.id); // Remove from wishlist after adding to cart
    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${item.name} đã được thêm vào giỏ hàng và xóa khỏi danh sách yêu thích.`,
    });
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">
            Danh sách yêu thích của bạn đang trống
          </h1>
          <p className="text-gray-600 mb-6">
            Hãy thêm những sản phẩm bạn yêu thích vào đây để dễ dàng theo dõi và
            mua sắm sau này!
          </p>
          <Link href="/products">
            <Button>
              <Heart className="h-4 w-4 mr-2" />
              Khám phá sản phẩm
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8">
          Danh sách yêu thích ({wishlistItems.length} sản phẩm)
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((item) => (
            <Card key={item.id} className="group relative">
              <CardContent className="p-0">
                <Link href={`/products/${item.id}`}>
                  <div className="relative overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={400}
                      className="object-cover w-full h-80 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                </Link>

                <div className="p-4">
                  <Link href={`/products/${item.id}`}>
                    <h3 className="text-sm font-medium text-gray-900 mb-1 hover:text-gray-600">
                      {item.name}
                    </h3>
                  </Link>

                  <div className="flex items-center space-x-2 mb-2">
                    <span className="text-lg font-semibold text-gray-900">
                      {formatPrice(item.price)}
                    </span>
                    {item.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(item.originalPrice)}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      className="flex-1"
                      onClick={() => handleAddToCart(item)}
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Thêm vào giỏ
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
