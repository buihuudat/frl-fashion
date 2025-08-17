import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RotateCcw, Shield, Clock, CheckCircle } from "lucide-react";

export default function ReturnsPage() {
  const returnConditions = [
    "Sản phẩm còn nguyên tem mác, chưa qua sử dụng",
    "Trong thời hạn 7 ngày kể từ ngày nhận hàng",
    "Còn đầy đủ hộp, túi, phụ kiện đi kèm",
    "Không thuộc danh sách sản phẩm không được đổi trả",
  ];

  const nonReturnableItems = [
    "Đồ lót, tất/vớ vì lý do vệ sinh",
    "Sản phẩm đã qua sử dụng hoặc giặt ủi",
    "Sản phẩm sale off trên 50%",
    "Phụ kiện nhỏ như khăn, mũ, găng tay",
  ];

  const returnProcess = [
    {
      step: 1,
      title: "Liên hệ yêu cầu đổi trả",
      description: "Gọi hotline hoặc gửi email với thông tin đơn hàng",
      time: "Trong 7 ngày",
    },
    {
      step: 2,
      title: "Xác nhận yêu cầu",
      description: "Chúng tôi sẽ xác nhận và hướng dẫn chi tiết",
      time: "Trong 24h",
    },
    {
      step: 3,
      title: "Gửi hàng về",
      description: "Đóng gói cẩn thận và gửi về địa chỉ được cung cấp",
      time: "2-3 ngày",
    },
    {
      step: 4,
      title: "Kiểm tra và xử lý",
      description: "Kiểm tra sản phẩm và tiến hành đổi/trả/hoàn tiền",
      time: "1-2 ngày",
    },
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
            <span className="text-gray-900">Chính sách đổi trả</span>
          </div>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light mb-4">Chính sách đổi trả</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất với chính
            sách đổi trả linh hoạt và thuận tiện.
          </p>
        </div>

        {/* Return Policy Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="font-semibold mb-2">7 ngày đổi trả</h3>
              <p className="text-sm text-gray-600">
                Thời gian đổi trả linh hoạt trong vòng 7 ngày
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="font-semibold mb-2">Miễn phí đổi hàng</h3>
              <p className="text-sm text-gray-600">
                Không tính phí đổi size hoặc màu sắc
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <RotateCcw className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="font-semibold mb-2">Hoàn tiền nhanh</h3>
              <p className="text-sm text-gray-600">
                Hoàn tiền trong 3-5 ngày làm việc
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Return Conditions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-green-600">
                <CheckCircle className="h-5 w-5 mr-2" />
                Điều kiện đổi trả
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {returnConditions.map((condition, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-sm">{condition}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center text-red-600">
                <Shield className="h-5 w-5 mr-2" />
                Sản phẩm không được đổi trả
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nonReturnableItems.map((item, index) => (
                  <div key={index} className="flex items-start">
                    <div className="w-2 h-2 bg-red-500 rounded-full mr-3 mt-2"></div>
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Return Process */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Quy trình đổi trả</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {returnProcess.map((process, index) => (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 font-bold">
                    {process.step}
                  </div>
                  <h4 className="font-semibold mb-2">{process.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">
                    {process.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {process.time}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Return Methods */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Cách thức đổi trả</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    🏪 Đổi trả tại cửa hàng
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Mang sản phẩm đến trực tiếp cửa hàng để được hỗ trợ nhanh
                    chóng
                  </p>
                  <p className="text-xs text-gray-500">
                    Địa chỉ: 123 Đường Nguyễn Huệ, Quận 1, TP.HCM
                  </p>
                </div>
                <div className="border rounded-lg p-4">
                  <h4 className="font-semibold mb-2">
                    📦 Gửi qua đường bưu điện
                  </h4>
                  <p className="text-sm text-gray-600 mb-2">
                    Đóng gói cẩn thận và gửi về địa chỉ được cung cấp
                  </p>
                  <p className="text-xs text-gray-500">
                    Phí vận chuyển: Miễn phí (nếu lỗi từ shop)
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Thông tin liên hệ</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">📞 Hotline hỗ trợ</h4>
                  <p className="text-sm text-gray-600">
                    (028) 1234 5678
                    <br />
                    Thời gian: 8:00 - 18:00 (Thứ 2 - Thứ 6)
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold mb-2">✉️ Email hỗ trợ</h4>
                  <p className="text-sm text-gray-600">
                    support@luxefashion.vn
                    <br />
                    Phản hồi trong vòng 24 giờ
                  </p>
                </div>
                <div className="pt-4">
                  <Button className="w-full">Yêu cầu đổi trả ngay</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* FAQ */}
        <Card>
          <CardHeader>
            <CardTitle>Câu hỏi thường gặp</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold mb-2">
                  Tôi có thể đổi size sau khi mua không?
                </h4>
                <p className="text-sm text-gray-600">
                  Có, bạn có thể đổi size miễn phí trong vòng 7 ngày nếu sản
                  phẩm chưa qua sử dụng và còn nguyên tem mác.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Mất bao lâu để nhận được tiền hoàn?
                </h4>
                <p className="text-sm text-gray-600">
                  Sau khi chúng tôi nhận và kiểm tra sản phẩm, tiền sẽ được hoàn
                  lại trong vòng 3-5 ngày làm việc.
                </p>
              </div>
              <div>
                <h4 className="font-semibold mb-2">
                  Ai chịu phí vận chuyển khi đổi trả?
                </h4>
                <p className="text-sm text-gray-600">
                  Nếu lỗi từ shop (gửi sai hàng, hàng lỗi), chúng tôi sẽ chịu
                  phí vận chuyển. Nếu khách hàng đổi ý, khách hàng sẽ chịu phí.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
