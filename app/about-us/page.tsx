"use client";

import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";

export default function AboutUsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8 text-center">Về chúng tôi</h1>

        {/* Introduction Section */}
        <section className="mb-12 text-center max-w-3xl mx-auto">
          <p className="text-lg text-gray-700 leading-relaxed mb-4">
            Chào mừng bạn đến với Luxe - nơi thời trang cao cấp gặp gỡ phong
            cách sống tinh tế. Chúng tôi tự hào mang đến những bộ sưu tập độc
            đáo, được thiết kế tỉ mỉ từ những chất liệu tốt nhất, dành riêng cho
            những người phụ nữ hiện đại, tự tin và yêu cái đẹp.
          </p>
          <p className="text-gray-600 leading-relaxed">
            Với sứ mệnh tôn vinh vẻ đẹp và cá tính riêng của mỗi khách hàng,
            Luxe không ngừng tìm kiếm và sáng tạo để tạo ra những sản phẩm không
            chỉ hợp thời trang mà còn mang giá trị vượt thời gian. Chúng tôi tin
            rằng mỗi bộ trang phục là một câu chuyện, và chúng tôi ở đây để giúp
            bạn kể câu chuyện của mình một cách trọn vẹn nhất.
          </p>
        </section>

        {/* Mission & Vision Section */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Sứ mệnh của chúng tôi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Mang đến những trải nghiệm mua sắm thời trang cao cấp tuyệt vời
                nhất, đồng thời truyền cảm hứng về phong cách và sự tự tin cho
                phụ nữ Việt Nam. Chúng tôi cam kết về chất lượng sản phẩm, dịch
                vụ khách hàng tận tâm và đóng góp tích cực cho cộng đồng.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold mb-4">
                Tầm nhìn của chúng tôi
              </h2>
              <p className="text-gray-700 leading-relaxed">
                Trở thành thương hiệu thời trang cao cấp hàng đầu tại Việt Nam,
                được biết đến không chỉ bởi những thiết kế đẳng cấp mà còn bởi
                giá trị bền vững và sự đổi mới không ngừng trong ngành thời
                trang.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* Contact Information */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6 text-center">
            Liên hệ với chúng tôi
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="text-center">
              <CardContent className="p-6 flex flex-col items-center">
                <MapPin className="h-8 w-8 text-gray-700 mb-3" />
                <h3 className="font-semibold mb-2">Địa chỉ</h3>
                <p className="text-gray-600">
                  123 Đường Thời Trang, Phường Luxe, Quận 1, TP. Hồ Chí Minh
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 flex flex-col items-center">
                <Phone className="h-8 w-8 text-gray-700 mb-3" />
                <h3 className="font-semibold mb-2">Điện thoại</h3>
                <p className="text-gray-600">028 1234 5678</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6 flex flex-col items-center">
                <Mail className="h-8 w-8 text-gray-700 mb-3" />
                <h3 className="font-semibold mb-2">Email</h3>
                <p className="text-gray-600">info@luxe.vn</p>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Map Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-light mb-6 text-center">
            Tìm chúng tôi trên bản đồ
          </h2>
          <div className="relative w-full h-96 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4999000000005!2d106.69999999999999!3d10.775843999999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3f00000001%3A0x123456789abcdef0!2sBitexco%20Financial%20Tower!5e0!3m2!1sen!2s!4v1678886400000!5m2!1sen!2s"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Luxe Store Location"
            ></iframe>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-12 bg-gray-100 rounded-lg">
          <h2 className="text-2xl font-light mb-4">Bạn có câu hỏi?</h2>
          <p className="text-gray-700 mb-6">
            Đừng ngần ngại liên hệ với đội ngũ hỗ trợ của chúng tôi để được giải
            đáp mọi thắc mắc.
          </p>
          <Link href="/contact">
            {" "}
            {/* Assuming a contact page exists or will be created */}
            <Button className="px-8 py-3">Liên hệ ngay</Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
