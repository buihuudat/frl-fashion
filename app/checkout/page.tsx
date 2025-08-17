"use client";

import type React from "react";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/contexts/cart-context";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import {
  createOrder,
  OrderStatus,
  PayMethod,
  PayStatus,
} from "@/services/useProduct";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  console.log({ items });

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isProcessing, setIsProcessing] = useState(false);

  const provinces = [
    {
      id: "hcm",
      name: "TP. Hồ Chí Minh",
      districts: [
        { id: "q1", name: "Quận 1" },
        { id: "qbinhthanh", name: "Quận Bình Thạnh" },
      ],
    },
    {
      id: "hn",
      name: "Hà Nội",
      districts: [
        { id: "hk", name: "Hoàn Kiếm" },
        { id: "bd", name: "Ba Đình" },
      ],
    },
  ];
  const districts = city
    ? provinces.find((p) => p.id === city)?.districts || []
    : [];
  const wards = district
    ? [
        { id: "p1", name: "Phường 1" },
        { id: "p2", name: "Phường 2" },
      ]
    : []; // Simplified mock wards

  useEffect(() => {
    if (!authLoading && user) {
      setFullName(`${user.fullname.firstname} ${user.fullname.lastname}` || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.addressText || "");
    }
  }, [user, authLoading]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const shippingFee = 30000;
  const totalAmount = totalPrice + shippingFee;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      window.location.href = "/auth/login";
      return;
    }

    setIsProcessing(true);

    if (items.length === 0) {
      toast({
        title: "Giỏ hàng trống",
        description:
          "Vui lòng thêm sản phẩm vào giỏ hàng trước khi thanh toán.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    if (!address) {
      toast({
        title: "Địa chỉ",
        description: "Vui lòng nhập địa chỉ trước khi thanh toán.",
        variant: "destructive",
      });
      setIsProcessing(false);
      return;
    }

    try {
      const orderData = {
        products: items,
        totalPrice: totalAmount,
        address: address || user.addressText,
        pay: {
          method: PayMethod.lastPay,
          amount: totalAmount,
          status: PayStatus.pending,
        },
        status: OrderStatus.pending,
      };

      await createOrder({
        userId: user?._id,
        order: orderData,
      });

      clearCart(); // Clear cart after successful order
      toast({
        title: "Đặt hàng thành công!",
        description:
          "Đơn hàng của bạn đã được tiếp nhận. Cảm ơn bạn đã mua sắm tại Luxe.",
        variant: "default",
      });
      router.push("/orders"); // Redirect to orders page or confirmation page
    } catch (error) {
      console.error("Order submission error:", error);
      toast({
        title: "Đặt hàng thất bại",
        description:
          "Có lỗi xảy ra trong quá trình đặt hàng. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0 && !isProcessing) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">
            Giỏ hàng của bạn đang trống
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng thêm sản phẩm vào giỏ hàng để tiến hành thanh toán.
          </p>
          <Link href="/products">
            <Button>Tiếp tục mua sắm</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8">Thanh toán</h1>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Shipping Information */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-xl font-light">
                1. Thông tin giao hàng
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              {/* Họ tên & SĐT */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label
                    htmlFor="fullName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Họ và tên
                  </Label>
                  <Input
                    id="fullName"
                    type="text"
                    placeholder="Nguyễn Văn A"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <Label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="0901234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <Label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Địa chỉ */}
              <div>
                <Label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Địa chỉ chi tiết
                </Label>
                <Input
                  id="address"
                  type="text"
                  placeholder="Số nhà, tên đường, tòa nhà..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  required
                />
              </div>

              {/* Tỉnh/TP, Quận/Huyện, Phường/Xã */}
              {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Tỉnh/Thành phố
                  </Label>
                  <Select value={city} onValueChange={setCity} required>
                    <SelectTrigger id="city">
                      <SelectValue placeholder="Chọn Tỉnh/Thành phố" />
                    </SelectTrigger>
                    <SelectContent>
                      {provinces.map((p) => (
                        <SelectItem key={p.id} value={p.id}>
                          {p.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="district"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Quận/Huyện
                  </Label>
                  <Select
                    value={district}
                    onValueChange={setDistrict}
                    disabled={!city}
                    required
                  >
                    <SelectTrigger id="district">
                      <SelectValue placeholder="Chọn Quận/Huyện" />
                    </SelectTrigger>
                    <SelectContent>
                      {districts.map((d) => (
                        <SelectItem key={d.id} value={d.id}>
                          {d.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label
                    htmlFor="ward"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phường/Xã
                  </Label>
                  <Select
                    value={ward}
                    onValueChange={setWard}
                    disabled={!district}
                    required
                  >
                    <SelectTrigger id="ward">
                      <SelectValue placeholder="Chọn Phường/Xã" />
                    </SelectTrigger>
                    <SelectContent>
                      {wards.map((w) => (
                        <SelectItem key={w.id} value={w.id}>
                          {w.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div> */}
            </CardContent>
          </Card>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1 space-y-8">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">
                  2. Tóm tắt đơn hàng
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div
                      key={`${item.id}-${item.size}-${item.color}`}
                      className="flex items-center space-x-4"
                    >
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium text-sm">{item.name}</h3>
                        <p className="text-xs text-gray-500">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` | Màu: ${item.color}`}
                        </p>
                        <p className="text-sm text-gray-600">
                          Số lượng: {item.quantity}
                        </p>
                      </div>
                      <span className="text-sm font-semibold">
                        {formatPrice(item.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>
                <Separator className="my-4" />
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Tổng tiền hàng:</span>
                    <span>{formatPrice(totalPrice)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatPrice(shippingFee)}</span>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between font-bold text-lg">
                    <span>Tổng cộng:</span>
                    <span className="text-red-600">
                      {formatPrice(totalAmount)}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl font-light">
                  3. Phương thức thanh toán
                </CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={paymentMethod}
                  onValueChange={setPaymentMethod}
                  className="space-y-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="cod" id="cod" />
                    <Label
                      htmlFor="cod"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Thanh toán khi nhận hàng (COD)</span>
                    </Label>
                  </div>
                  {/* <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bank" id="bank" />
                    <Label
                      htmlFor="bank"
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <span>Chuyển khoản ngân hàng</span>
                    </Label>
                  </div> */}
                  {/* Add more payment methods as needed */}
                </RadioGroup>
              </CardContent>
            </Card>

            <Button
              type="submit"
              className="w-full py-3 text-lg"
              disabled={isProcessing}
            >
              {isProcessing ? "Đang xử lý..." : "Đặt hàng ngay"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
