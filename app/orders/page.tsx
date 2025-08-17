"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Calendar, DollarSign, MapPin, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import Image from "next/image";
import router from "next/router";
import { getOrders, OrderItemType, OrderStatus } from "@/services/useProduct";

export default function OrdersPage() {
  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const [orders, setOrders] = useState<OrderItemType[]>([]);
  const [userOrder, setUserOrder] = useState(null);
  const [isLoadingOrders, setIsLoadingOrders] = useState(true);

  const fetchOrders = async () => {
    await getOrders(user?._id).then((data) => {
      setOrders(data?.orders || []);
      setUserOrder(data?.user);
    });
    setIsLoadingOrders(false);
  };

  useEffect(() => {
    if (!authLoading && !user) {
      toast({
        title: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để xem lịch sử đơn hàng.",
        variant: "destructive",
      });
      router.push("/auth/login");
    } else if (user) {
      setIsLoadingOrders(true);
      fetchOrders();
    }
  }, [user, authLoading, toast]);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.pending:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            Đang chờ xử lý
          </Badge>
        );
      case OrderStatus.access:
        return <Badge className="bg-blue-100 text-blue-800">Đang xử lý</Badge>;
      case OrderStatus.success:
        return (
          <Badge className="bg-green-100 text-green-800">Thành công</Badge>
        );
      case OrderStatus.done:
        return <Badge className="bg-green-200 text-green-900">Hoàn tất</Badge>;
      case OrderStatus.refuse:
        return <Badge variant="destructive">Từ chối</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  if (authLoading || (user && isLoadingOrders)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải đơn hàng...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">
            Bạn cần đăng nhập để xem đơn hàng
          </h1>
          <p className="text-gray-600 mb-6">
            Vui lòng đăng nhập vào tài khoản của bạn để xem lịch sử mua sắm.
          </p>
          <Link href="/auth/login">
            <Button>Đăng nhập ngay</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">Bạn chưa có đơn hàng nào</h1>
          <p className="text-gray-600 mb-6">
            Hãy bắt đầu mua sắm để xem lịch sử đơn hàng của bạn tại đây!
          </p>
          <Link href="/products">
            <Button>Khám phá sản phẩm</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8">Lịch sử đơn hàng</h1>

        <div className="space-y-6">
          {orders.map((order) => (
            <Card key={order._id}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-lg font-semibold">
                  Đơn hàng #{order._id}
                </CardTitle>
                {getStatusBadge(order.status)}
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span>
                      Ngày đặt:{" "}
                      {new Date(order?.createdAt).toLocaleDateString("vi-VN")}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-gray-500" />
                    <span>Tổng tiền: {formatPrice(order.totalPrice)}</span>
                  </div>
                  <div className="flex items-center space-x-2 lg:col-span-1 md:col-span-2">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    <span>Địa chỉ: {order?.address}</span>
                  </div>
                </div>

                <div className="border-t pt-4 mt-4">
                  <h3 className="font-medium mb-3">Sản phẩm trong đơn hàng:</h3>
                  <div className="space-y-3">
                    {order.products.map((item) => (
                      <div
                        key={item._id}
                        className="flex items-center space-x-3"
                      >
                        <Image
                          src={item.images?.[0] || "/placeholder.svg"}
                          alt={item.title}
                          width={50}
                          height={50}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.title}</p>
                          <p className="text-sm text-gray-500">
                            {item.category}
                          </p>
                          <p className="text-xs text-gray-500">
                            {item?.size && `Size: ${item.size}`}
                            {item?.color && ` | Màu: ${item.color}`}
                            <span> | SL: {item.quantity}</span>
                          </p>
                        </div>
                        <span className="text-sm font-semibold">
                          {formatPrice(item.lastPrice * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end mt-4">
                  <Link href={`/orders/${order._id}`}>
                    <Button variant="outline">
                      Xem chi tiết <ChevronRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
