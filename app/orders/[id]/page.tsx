"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Calendar,
  DollarSign,
  MapPin,
  Package,
  Truck,
  CheckCircle,
  XCircle,
  ArrowLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { useParams, useRouter } from "next/navigation";
import { cancelOrder, getOrder } from "@/services/useProduct";

interface OrderItem {
  productId: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  size?: string;
  color?: string;
}

interface Order {
  id: string;
  orderDate: string;
  totalAmount: number;
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
  shippingAddress: string;
  paymentMethod: string;
  items: OrderItem[];
  trackingNumber?: string;
  estimatedDelivery?: string;
}

export default function OrderDetailPage() {
  const params = useParams();

  const { user, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [isLoadingOrder, setIsLoadingOrder] = useState(true);

  const fetchData = async () => {
    await getOrder({ userId: user?._id, orderId: params.id })
      .then((res) => {
        setOrder(res);
        setIsLoadingOrder(false);
      })
      .catch((err) => {
        toast({
          title: "Lỗi",
          description: "Không thể tải đơn hàng",
          variant: "destructive",
        });
      });
  };

  useEffect(() => {
    if (authLoading) return;

    if (!user) {
      toast({
        title: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để xem chi tiết đơn hàng.",
        variant: "destructive",
      });

      router.push("/auth/login");
      return;
    }

    fetchData();
  }, [authLoading, user, toast, router, params]);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);

  const getStatusBadge = (status: Order["status"]) => {
    const baseClass = "px-2 py-1 rounded-full text-xs font-medium border";

    const statusMap: Record<
      string,
      { label: string; color: string; emoji: string }
    > = {
      pending: {
        label: "Đang chờ xử lý",
        color: "yellow",
        emoji: "⏳",
      },
      processing: {
        label: "Đang xử lý",
        color: "blue",
        emoji: "🔄",
      },
      shipped: {
        label: "Đang giao hàng",
        color: "orange",
        emoji: "🚚",
      },
      delivered: {
        label: "Đã giao hàng",
        color: "green",
        emoji: "✅",
      },
      cancelled: {
        label: "Đã hủy",
        color: "red",
        emoji: "❌",
      },
    };

    const badge = statusMap[status];

    if (!badge) {
      return <Badge variant="secondary">{status}</Badge>;
    }

    const { label, color, emoji } = badge;

    return (
      <span
        className={`${baseClass} bg-${color}-50 text-${color}-700 border-${color}-300`}
      >
        {emoji} {label}
      </span>
    );
  };

  if (authLoading || (user && isLoadingOrder)) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center text-gray-500">
          Đang tải chi tiết đơn hàng...
        </div>
      </div>
    );
  }

  const handleCancelOrder = async () => {
    const confirmCancel = window.confirm("Bạn có chắc muốn hủy đơn hàng này?");

    if (!confirmCancel) return;

    try {
      await cancelOrder(user?._id, order?._id, "cancelled");

      toast({
        title: "Hủy đơn hàng thành công",
        description: "Đơn hàng của bạn đã được hủy thành công.",
      });

      router.back();
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast({
        title: "Có lỗi xảy ra",
        description: "Không thể hủy đơn hàng. Vui lòng thử lại sau.",
        variant: "destructive",
      });
    }
  };

  if (!user) return <></>;

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          <h1 className="text-3xl font-light mb-4">Không tìm thấy đơn hàng</h1>
          <p className="text-gray-600 mb-6">
            Đơn hàng bạn đang tìm kiếm không tồn tại hoặc bạn không có quyền
            truy cập.
          </p>
          <Link href="/orders">
            <Button>Quay lại lịch sử đơn hàng</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <Link href="/orders">
            <Button variant="ghost" className="pl-0">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Quay lại lịch sử đơn hàng
            </Button>
          </Link>
        </div>

        <h1 className="text-lg font-semibold mb-8">
          Chi tiết đơn hàng #{order?._id}
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Card className="lg:col-span-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                Thông tin đơn hàng
              </CardTitle>
              {getStatusBadge(order.status)}
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span>
                  <strong>Ngày đặt:</strong>{" "}
                  {new Date(order?.createdAt).toLocaleDateString("vi-VN")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span>
                  <strong>Thanh toán:</strong> {formatPrice(order?.totalPrice)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span>
                  <strong>Giao tới:</strong> {order?.address}
                </span>
              </div>
              {order.trackingNumber && (
                <div className="flex items-center gap-2">
                  <Package className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Mã vận đơn:</strong> {order.trackingNumber}
                  </span>
                </div>
              )}
              {order.estimatedDelivery && (
                <div className="flex items-center gap-2">
                  <Truck className="h-4 w-4 text-gray-500" />
                  <span>
                    <strong>Dự kiến:</strong>{" "}
                    {new Date(order.estimatedDelivery).toLocaleDateString(
                      "vi-VN"
                    )}
                  </span>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="lg:col-span-1 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">
                Sản phẩm ({order?.products?.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {order?.products.map((item) => (
                <div key={item.productId} className="flex items-center gap-3">
                  <Image
                    src={item.images?.[0] || "/placeholder.svg"}
                    alt={item?.title}
                    width={60}
                    height={60}
                    className="rounded-md object-cover"
                  />
                  <div className="flex flex-col">
                    <div className="flex-1">
                      <Link href={`/products/${item?.title}`}>
                        <p className="text-sm font-medium hover:text-gray-700">
                          {item.title}
                        </p>
                      </Link>
                      <p className="text-xs text-gray-500">
                        {item.size && `Size: ${item.size}`}
                        {item.color && ` | Màu: ${item.color}`}
                        <span> | SL: {item.quantity}</span>
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-gray-800">
                      {formatPrice(item.price * item.quantity)}
                    </span>
                  </div>
                </div>
              ))}
              <Separator className="my-4" />
              <div className="flex justify-between font-bold text-lg">
                <span>Tổng cộng:</span>
                <span className="text-red-600">
                  {formatPrice(order?.totalPrice)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="mt-8 flex justify-end gap-4">
          {order.status === "pending" && (
            <Button variant="destructive" onClick={handleCancelOrder}>
              <XCircle className="h-4 w-4 mr-2" />
              Hủy đơn hàng
            </Button>
          )}
          {order.status === "delivered" && (
            <Button
              variant="outline"
              className="border-green-300 text-green-700 hover:bg-green-50 bg-transparent"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Xác nhận đã nhận hàng
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
