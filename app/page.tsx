import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";

export default function HomePage() {
  const featuredProducts = [
    {
      id: "1",
      name: "Áo sơ mi lụa cao cấp",
      price: 1200000,
      originalPrice: 1500000,
      image:
        "https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg",
      badge: "25%",
      rating: 4.8,
      reviews: 124,
    },
    {
      id: "2",
      name: "Váy dạ hội sang trọng",
      price: 2500000,
      image:
        "https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg",
      rating: 4.9,
      reviews: 89,
    },
    {
      id: "3",
      name: "Áo khoác blazer nữ",
      price: 1800000,
      originalPrice: 2200000,
      image:
        "https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg",
      badge: "SALE",
      rating: 4.7,
      reviews: 156,
    },
    {
      id: "4",
      name: "Chân váy midi thanh lịch",
      price: 950000,
      image:
        "https://thumbs.dreamstime.com/b/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg",
      rating: 4.6,
      reviews: 78,
    },
  ];

  const stores = [
    {
      id: "1",
      name: "Luxe Flagship Store",
      address: "123 Nguyễn Huệ, Q1, TP.HCM",
      image: "/placeholder.svg?height=200&width=300",
      products: 245,
    },
    {
      id: "2",
      name: "Luxe Boutique Hà Nội",
      address: "456 Hoàn Kiếm, Hà Nội",
      image: "/placeholder.svg?height=200&width=300",
      products: 189,
    },
    {
      id: "3",
      name: "Luxe Premium Đà Nẵng",
      address: "789 Hải Châu, Đà Nẵng",
      image: "/placeholder.svg?height=200&width=300",
      products: 156,
    },
  ];

  const news = [
    {
      id: "1",
      title: "Xu hướng thời trang Thu Đông 2024",
      excerpt:
        "Khám phá những xu hướng thời trang mới nhất cho mùa Thu Đông 2024 với những gam màu ấm áp và chất liệu cao cấp.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-15",
      category: "Xu hướng",
    },
    {
      id: "2",
      title: "Bí quyết phối đồ công sở thanh lịch",
      excerpt:
        "Hướng dẫn chi tiết cách phối đồ công sở chuyên nghiệp và thanh lịch cho phái đẹp hiện đại.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-12",
      category: "Phong cách",
    },
    {
      id: "3",
      title: "Bộ sưu tập mới: Elegant Evening",
      excerpt:
        "Ra mắt bộ sưu tập Elegant Evening với những thiết kế dạ hội sang trọng và quyến rũ.",
      image: "/placeholder.svg?height=200&width=300",
      date: "2024-01-10",
      category: "Bộ sưu tập",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <iframe
            src="https://www.youtube.com/embed/kfc4K-6F5UE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=kfc4K-6F5UE&modestbranding=1"
            title="YouTube video background"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
            className="w-full h-full absolute top-0 left-0 pointer-events-none"
          ></iframe>
        </div>
        <div className="absolute inset-0 flex items-center">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-md">
              <h1 className="text-5xl md:text-6xl font-light text-white mb-4 leading-tight">
                THỜI TRANG
                <br />
                CAO CẤP
              </h1>
              <p className="text-white text-lg mb-8 font-light">
                Bộ sưu tập thời trang sang trọng dành cho phụ nữ hiện đại.
              </p>
              <Link href="/products">
                <Button className="bg-white text-black hover:bg-gray-100 px-8 py-3">
                  KHÁM PHÁ NGAY
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">SẢN PHẨM NỔI BẬT</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Khám phá những sản phẩm được yêu thích nhất từ bộ sưu tập mới nhất
              của chúng tôi
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/products">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                XEM TẤT CẢ SẢN PHẨM
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stores Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">CỬA HÀNG CỦA CHÚNG TÔI</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ghé thăm các cửa hàng Luxe trên toàn quốc để trải nghiệm dịch vụ
              tốt nhất
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stores.map((store) => (
              <Card key={store.id} className="group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={store.image || "/placeholder.svg"}
                      alt={store.name}
                      width={300}
                      height={200}
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2">{store.name}</h3>
                    <p className="text-gray-600 text-sm mb-2">
                      {store.address}
                    </p>
                    <p className="text-sm text-blue-600">
                      {store.products} sản phẩm
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/stores">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                XEM TẤT CẢ CỬA HÀNG
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* News Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-light mb-4">TIN TỨC & XU HƯỚNG</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Cập nhật những xu hướng thời trang mới nhất và bí quyết phối đồ từ
              các chuyên gia
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {news.map((article) => (
              <Card key={article.id} className="group cursor-pointer">
                <CardContent className="p-0">
                  <div className="relative overflow-hidden">
                    <Image
                      src={article.image || "/placeholder.svg"}
                      alt={article.title}
                      width={300}
                      height={200}
                      className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                    />
                    <Badge className="absolute top-4 left-4 bg-white text-black">
                      {article.category}
                    </Badge>
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(article.date).toLocaleDateString("vi-VN")}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/news">
              <Button
                variant="outline"
                className="border-black text-black hover:bg-black hover:text-white"
              >
                XEM TẤT CẢ TIN TỨC
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-light mb-4">ĐĂNG KÝ NHẬN TIN</h2>
          <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
            Đăng ký để nhận thông tin về các sản phẩm mới, khuyến mãi đặc biệt
            và xu hướng thời trang mới nhất
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Nhập email của bạn"
              className="flex-1 px-4 py-3 rounded-l-lg text-black"
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-r-lg rounded-l-none">
              ĐĂNG KÝ
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 border-t">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <Link
                href="/"
                className="text-2xl font-serif text-gray-900 mb-4 inline-block"
              >
                luxe
              </Link>
              <p className="text-gray-600 text-sm">
                Thương hiệu thời trang cao cấp dành cho phụ nữ hiện đại, mang
                đến phong cách thanh lịch và sang trọng.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Sản phẩm</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/products?category=ao-so-mi">Áo sơ mi</Link>
                </li>
                <li>
                  <Link href="/products?category=vay">Váy</Link>
                </li>
                <li>
                  <Link href="/products?category=ao-khoac">Áo khoác</Link>
                </li>
                <li>
                  <Link href="/products?category=phu-kien">Phụ kiện</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Hỗ trợ</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <Link href="/contact">Liên hệ</Link>
                </li>
                <li>
                  <Link href="/size-guide">Hướng dẫn chọn size</Link>
                </li>
                <li>
                  <Link href="/shipping">Chính sách giao hàng</Link>
                </li>
                <li>
                  <Link href="/returns">Đổi trả</Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Theo dõi chúng tôi</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li>
                  <a href="#">Facebook</a>
                </li>
                <li>
                  <a href="#">Instagram</a>
                </li>
                <li>
                  <a href="#">YouTube</a>
                </li>
                <li>
                  <a href="#">TikTok</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-gray-500">
            <p>© 2024 Luxe. Tất cả quyền được bảo lưu.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
