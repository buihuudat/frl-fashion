"use client";

import { CardTitle } from "@/components/ui/card";

import { CardHeader } from "@/components/ui/card";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { useCart } from "@/contexts/cart-context";
import { useToast } from "@/hooks/use-toast";

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalPrice, clearCart } =
    useCart();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const shippingFee = 30000; // Phí vận chuyển cố định ví dụ
  const totalAmount = totalPrice + shippingFee;

  const handleUpdateQuantity = (id: string, newQuantity: number) => {
    updateQuantity(id, newQuantity);
    toast({
      title: "Cập nhật số lượng",
      description: "Số lượng sản phẩm đã được cập nhật.",
    });
  };

  const handleRemoveItem = (id: string, name: string) => {
    removeItem(id);
    toast({
      title: "Đã xóa sản phẩm",
      description: `${name} đã được xóa khỏi giỏ hàng.`,
      variant: "destructive",
    });
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="text-gray-600 mb-6">
            Hãy thêm những sản phẩm yêu thích vào giỏ hàng để bắt đầu mua sắm!
          </p>
          <Link href="/products">
            <Button>
              <ShoppingBag className="h-4 w-4 mr-2" />
              Tiếp tục mua sắm
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
        <h1 className="text-3xl font-light mb-8">Giỏ hàng của bạn</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {items.map((item) => (
              <Card key={`${item.id}-${item.size}-${item.color}`}>
                <CardContent className="p-4 flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <Link href={`/products/${item.id}`} className="flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={100}
                      height={100}
                      className="rounded-md object-cover"
                    />
                  </Link>

                  <div className="flex-1 text-center sm:text-left">
                    <Link href={`/products/${item.id}`}>
                      <h3 className="font-medium text-lg mb-1 hover:text-gray-700">
                        {item.name}
                      </h3>
                    </Link>
                    {item.size && (
                      <p className="text-sm text-gray-500">Size: {item.size}</p>
                    )}
                    {item.color && (
                      <p className="text-sm text-gray-500">Màu: {item.color}</p>
                    )}
                    <p className="text-lg font-semibold mt-2">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => {
                        const newQty = Number.parseInt(e.target.value);
                        if (!isNaN(newQty) && newQty >= 1) {
                          handleUpdateQuantity(item.id, newQty);
                        }
                      }}
                      className="w-16 text-center"
                    />
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() =>
                        handleUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                  </div>

                  <div className="flex flex-col items-center sm:items-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="text-xl font-bold text-red-600">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveItem(item.id, item.name)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
            <div className="flex justify-between">
              <Link href="/products">
                <Button variant="outline">Tiếp tục mua sắm</Button>
              </Link>
              <Button variant="destructive" onClick={clearCart}>
                Xóa tất cả
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <Card className="lg:col-span-1 h-fit sticky top-20">
            <CardHeader>
              <CardTitle className="text-xl font-light">
                Tóm tắt đơn hàng
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Tổng tiền hàng ({items.length} sản phẩm):</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Phí vận chuyển:</span>
                <span>{formatPrice(shippingFee)}</span>
              </div>
              {/* You can add discount/coupon here */}
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng:</span>
                <span className="text-red-600">{formatPrice(totalAmount)}</span>
              </div>
              <Link href="/checkout">
                <Button className="w-full py-3 text-lg">
                  Tiến hành thanh toán
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
