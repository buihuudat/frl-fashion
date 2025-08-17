import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { getProducts } from "@/services/useProduct";
import { Product } from "@/types/product";
import { getShops } from "@/services/useShop";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getNews } from "@/services/useNews";
import { Footer } from "@/components/footer";

export default async function HomePage() {
  const products = await getProducts();
  const shops = await getShops();
  const news = await getNews();

  console.log({ shops });

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <section className="relative h-screen">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
          <iframe
            src="https://www.youtube.com/embed/kfc4K-6F5UE?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&playlist=kfc4K-6F5UE&modestbranding=1&vq=hd1080"
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
            {(products?.products as Product[])?.slice(0, 8)?.map((product) => (
              <ProductCard key={product._id} product={product} />
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
              Ghé thăm các cửa hàng 4Star trên toàn quốc để trải nghiệm dịch vụ
              tốt nhất
            </p>
          </div>

          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {shops.map((store) => (
                <CarouselItem
                  key={store._id}
                  className="basis-full sm:basis-1/2 md:basis-1/3 lg:basis-1/4"
                >
                  <Link href={`/shop/${store._id}`}>
                    <Card className="group cursor-pointer h-full">
                      <CardContent className="p-0">
                        {/* Shop Image */}
                        <div className="relative overflow-hidden">
                          <Image
                            src={store?.image || ""}
                            alt={store.name}
                            width={300}
                            height={200}
                            className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>

                        {/* Shop Info */}
                        <div className="p-4">
                          <h3 className="text-lg font-semibold mb-1">
                            {store.name}
                          </h3>
                          <p className="text-gray-600 text-sm mb-2 line-clamp-2 h-12">
                            {store.bio}
                          </p>
                          <p className="text-sm text-blue-600">
                            {store.products?.length || 0} sản phẩm
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
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

          <Carousel>
            <CarouselContent className="-ml-4">
              {news.newsList.map((article, idx) => (
                <CarouselItem
                  key={idx}
                  className="pl-1 md:basis-1/2 lg:basis-1/3 p-3"
                >
                  <div className="group cursor-pointer bg-white rounded shadow">
                    <div className="relative overflow-hidden rounded-t">
                      <img
                        src={article.thumbnail || "/placeholder.svg"}
                        alt={article.title}
                        className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                        width={300}
                        height={200}
                      />
                      <div className="absolute top-4 left-4 bg-white text-black px-2 py-1 rounded">
                        {article.category}
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {article.author?.fullname?.firstname}
                      </p>
                      <p className="text-xs text-gray-500">
                        {new Date(article.createdAt).toLocaleDateString(
                          "vi-VN"
                        )}
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

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
              className="flex-1 px-4 py-3 rounded-l-lg text-white border-white"
            />
            <Button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-r-lg rounded-l-none">
              ĐĂNG KÝ
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
