import { Header } from "@/components/header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

export default function SizeGuidePage() {
  const menSizes = [
    { size: "S", chest: "88-92", waist: "76-80", hip: "88-92" },
    { size: "M", chest: "96-100", waist: "84-88", hip: "96-100" },
    { size: "L", chest: "104-108", waist: "92-96", hip: "104-108" },
    { size: "XL", chest: "112-116", waist: "100-104", hip: "112-116" },
    { size: "XXL", chest: "120-124", waist: "108-112", hip: "120-124" },
  ];

  const womenSizes = [
    { size: "XS", chest: "80-84", waist: "60-64", hip: "86-90" },
    { size: "S", chest: "84-88", waist: "64-68", hip: "90-94" },
    { size: "M", chest: "88-92", waist: "68-72", hip: "94-98" },
    { size: "L", chest: "92-96", waist: "72-76", hip: "98-102" },
    { size: "XL", chest: "96-100", waist: "76-80", hip: "102-106" },
  ];

  const shoeSizes = [
    { eu: "35", us: "5", uk: "2.5", cm: "22.5" },
    { eu: "36", us: "6", uk: "3.5", cm: "23" },
    { eu: "37", us: "6.5", uk: "4", cm: "23.5" },
    { eu: "38", us: "7.5", uk: "5", cm: "24" },
    { eu: "39", us: "8", uk: "5.5", cm: "24.5" },
    { eu: "40", us: "9", uk: "6.5", cm: "25" },
    { eu: "41", us: "9.5", uk: "7", cm: "25.5" },
    { eu: "42", us: "10.5", uk: "8", cm: "26" },
    { eu: "43", us: "11", uk: "8.5", cm: "26.5" },
    { eu: "44", us: "12", uk: "9.5", cm: "27" },
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
            <span className="text-gray-900">Hướng dẫn chọn size</span>
          </div>
        </nav>

        <div className="mb-12 text-center">
          <h1 className="text-4xl font-light mb-4">Hướng dẫn chọn size</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tìm size phù hợp với bạn để có trải nghiệm mua sắm tốt nhất. Hãy
            tham khảo bảng size chi tiết dưới đây.
          </p>
        </div>

        {/* How to Measure */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Cách đo số đo cơ thể</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📏</span>
                </div>
                <h3 className="font-semibold mb-2">Vòng ngực</h3>
                <p className="text-sm text-gray-600">
                  Đo quanh phần rộng nhất của ngực, giữ thước đo song song với
                  sàn
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📐</span>
                </div>
                <h3 className="font-semibold mb-2">Vòng eo</h3>
                <p className="text-sm text-gray-600">
                  Đo quanh phần nhỏ nhất của eo, thường ở trên rốn 2-3cm
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📊</span>
                </div>
                <h3 className="font-semibold mb-2">Vòng hông</h3>
                <p className="text-sm text-gray-600">
                  Đo quanh phần rộng nhất của hông, thường ở dưới eo 15-20cm
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Size Charts */}
        <Tabs defaultValue="women" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="women">Nữ</TabsTrigger>
            <TabsTrigger value="men">Nam</TabsTrigger>
            <TabsTrigger value="shoes">Giày dép</TabsTrigger>
          </TabsList>

          <TabsContent value="women" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bảng size quần áo nữ</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">
                          Size
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng ngực (cm)
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng eo (cm)
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng hông (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {womenSizes.map((size, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Badge variant="outline">{size.size}</Badge>
                          </td>
                          <td className="py-3 px-4">{size.chest}</td>
                          <td className="py-3 px-4">{size.waist}</td>
                          <td className="py-3 px-4">{size.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="men" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bảng size quần áo nam</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">
                          Size
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng ngực (cm)
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng eo (cm)
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Vòng hông (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {menSizes.map((size, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Badge variant="outline">{size.size}</Badge>
                          </td>
                          <td className="py-3 px-4">{size.chest}</td>
                          <td className="py-3 px-4">{size.waist}</td>
                          <td className="py-3 px-4">{size.hip}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shoes" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Bảng size giày dép</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-semibold">
                          EU
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          US
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          UK
                        </th>
                        <th className="text-left py-3 px-4 font-semibold">
                          Chiều dài chân (cm)
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {shoeSizes.map((size, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="py-3 px-4">
                            <Badge variant="outline">{size.eu}</Badge>
                          </td>
                          <td className="py-3 px-4">{size.us}</td>
                          <td className="py-3 px-4">{size.uk}</td>
                          <td className="py-3 px-4">{size.cm}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Tips */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Lưu ý khi chọn size</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold mb-3 text-green-600">✓ Nên làm</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Đo số đo khi mặc đồ lót phù hợp</li>
                  <li>
                    • Đo vào buổi chiều khi cơ thể ở trạng thái bình thường
                  </li>
                  <li>• Tham khảo bảng size của từng sản phẩm cụ thể</li>
                  <li>• Liên hệ tư vấn nếu có thắc mắc</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-3 text-red-600">✗ Không nên</h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Đo khi đang đói hoặc no quá mức</li>
                  <li>• Căng thước đo quá chặt hoặc quá lỏng</li>
                  <li>• Chọn size dựa trên cảm tính</li>
                  <li>• Bỏ qua hướng dẫn chăm sóc sản phẩm</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
