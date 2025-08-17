import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Truck, Clock, MapPin, Shield } from "lucide-react";

export default function ShippingPage() {
  const shippingMethods = [
    {
      name: "Giao hàng tiêu chuẩn",
      time: "3-5 ngày làm việc",
      fee: "30.000đ",
      description: "Phù hợp cho đơn hàng thông thường",
      icon: "🚚",
    },
    {
      name: "Giao hàng nhanh",
      time: "1-2 ngày làm việc",
      fee: "50.000đ",
      description: "Giao hàng trong nội thành TP.HCM và Hà Nội",
      icon: "⚡",
    },
    {
      name: "Giao hàng hỏa tốc",
      time: "Trong ngày",
      fee: "80.000đ",
      description: "Đặt hàng trước 14h, nhận hàng trong ngày",
      icon: "🚀",
    },
  ];

  const freeShippingConditions = [
    "Đơn hàng từ 500.000đ trở lên",
    "Khách hàng VIP (mua từ 5 đơn hàng)",
    "Sản phẩm trong chương trình khuyến mãi",
    "Đơn hàng trong khu vực nội thành",
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <a href="/" className="hover:text-gray-900">
              Trang chủ
            </a>
            <span>/</span>
            <span className="text-gray-900">Chính sách giao hàng</span>
          </div>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light mb-4">Chính sách giao hàng</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết giao hàng nhanh chóng, an toàn và đúng hẹn đến tay
            khách hàng.
          </p>
        </div>

        {/* Shipping Methods */}
        <div className="mb-12">
          <h2 className="text-2xl font-light mb-6">Phương thức giao hàng</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {shippingMethods.map((method, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{method.icon}</div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {method.fee}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{method.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center text-sm text-gray-600">
                      <Clock className="h-4 w-4 mr-2" />
                      {method.time}
                    </div>
                    <p className="text-sm text-gray-600">
                      {method.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Free Shipping */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-green-600" />
              Miễn phí giao hàng
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Chúng tôi miễn phí giao hàng khi đơn hàng của bạn đáp ứng một
              trong các điều kiện sau:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {freeShippingConditions.map((condition, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                  <span className="text-sm">{condition}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Shipping Areas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="h-5 w-5 mr-2 text-blue-600" />
                Khu vực giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Nội thành (1-2 ngày)</h4>
                  <p className="text-sm text-gray-600">
                    TP. Hồ Chí Minh, Hà Nội, Đà Nẵng và các quận trung tâm
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">Ngoại thành (2-3 ngày)</h4>
                  <p className="text-sm text-gray-600">
                    Các huyện thuộc TP.HCM, Hà Nội và các tỉnh lân cận
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">
                    Tỉnh thành khác (3-5 ngày)
                  </h4>
                  <p className="text-sm text-gray-600">
                    Tất cả các tỉnh thành trên toàn quốc
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Truck className="h-5 w-5 mr-2 text-orange-600" />
                Quy trình giao hàng
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold">Xác nhận đơn hàng</h4>
                    <p className="text-sm text-gray-600">
                      Kiểm tra thông tin và xác nhận đơn hàng
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold">Chuẩn bị hàng</h4>
                    <p className="text-sm text-gray-600">
                      Đóng gói cẩn thận và gửi mã vận đơn
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold">Vận chuyển</h4>
                    <p className="text-sm text-gray-600">
                      Theo dõi hành trình qua mã vận đơn
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold">Giao hàng</h4>
                    <p className="text-sm text-gray-600">
                      Nhận hàng và kiểm tra trước khi thanh toán
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Important Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Lưu ý quan trọng</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-blue-600">
                  📦 Đóng gói
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Sản phẩm được đóng gói cẩn thận, chống sốc</li>
                  <li>• Kèm theo hóa đơn và phiếu bảo hành</li>
                  <li>• Đóng gói riêng cho từng sản phẩm dễ vỡ</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-green-600">
                  ✅ Nhận hàng
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Kiểm tra kỹ sản phẩm trước khi nhận</li>
                  <li>• Có quyền từ chối nếu hàng không đúng mô tả</li>
                  <li>• Thanh toán sau khi hài lòng với sản phẩm</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
