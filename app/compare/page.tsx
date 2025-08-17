"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { X, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { Product } from "@/types/product";
import { SelectProductModal } from "./components/SelectProductModal";
import { getProducts } from "@/services/useProduct";

export default function ComparePage() {
  const [compareProducts, setCompareProducts] = useState<Product[]>([]);
  const [visibleModalAddProduct, setVisibleModalAddProduct] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getProducts();
      setProducts(data.products);
    };
    fetchData();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const removeProduct = (id: string) => {
    setCompareProducts((prev) => prev.filter((product) => product._id !== id));
  };

  const addProduct = (product: any) => {
    if (compareProducts.length < 4) {
      const newProduct: Product = {
        ...product,
        material: "Cotton blend",
        sizes: ["S", "M", "L"],
        colors: ["Trắng", "Đen"],
        features: ["Chất lượng cao", "Thiết kế hiện đại"],
      };
      setCompareProducts((prev) => [...prev, newProduct]);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-light mb-4">So sánh sản phẩm</h1>
          <p className="text-gray-600">
            So sánh chi tiết các sản phẩm để đưa ra lựa chọn tốt nhất cho bạn
          </p>
        </div>

        {compareProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 mb-4">
              Chưa có sản phẩm nào để so sánh
            </p>
            <Button onClick={() => setVisibleModalAddProduct(true)}>
              Thêm sản phẩm
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="min-w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {compareProducts.map((product) => (
                  <Card key={product._id} className="relative">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
                      onClick={() => removeProduct(product._id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>

                    <CardContent className="p-4">
                      <div className="text-center mb-4">
                        <Image
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.title}
                          width={200}
                          height={250}
                          className="mx-auto rounded-lg object-cover"
                        />
                      </div>

                      <h3 className="font-semibold text-lg mb-2">
                        {product.title}
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Giá
                          </h4>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-red-600">
                              {formatPrice(product.price)}
                            </span>
                            {product.lastPrice && (
                              <span className="text-sm text-gray-500 line-through">
                                {formatPrice(product.lastPrice)}
                              </span>
                            )}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Đánh giá
                          </h4>
                          <div className="flex items-center space-x-1">
                            <span className="text-yellow-500">★</span>
                            <span className="text-sm">
                              {product.averageStarRating}
                            </span>
                            <span className="text-xs text-gray-500">
                              ({product.comments?.length} đánh giá)
                            </span>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-medium text-sm text-gray-700 mb-1">
                            Size có sẵn
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {product.tags.map((size) => (
                              <Badge
                                key={size?._id}
                                variant="outline"
                                className="text-xs"
                              >
                                {size?.name}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <Button className="w-full">Thêm vào giỏ hàng</Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {compareProducts.length < 4 && (
                  <Card className="border-2 border-dashed border-gray-300">
                    <CardContent className="p-4 h-full flex items-center justify-center">
                      <div className="text-center">
                        <Plus className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-500 mb-4">
                          Thêm sản phẩm để so sánh
                        </p>
                        <Button
                          variant="outline"
                          onClick={() => setVisibleModalAddProduct(true)}
                        >
                          Chọn sản phẩm
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Suggested Products */}
        <div className="mt-12">
          <h2 className="text-2xl font-light mb-6">Sản phẩm gợi ý</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div key={product.id} className="relative">
                <ProductCard product={product} />
                <Button
                  className="absolute top-2 left-2 bg-white text-black hover:bg-gray-100"
                  size="sm"
                  onClick={() => addProduct(product)}
                  disabled={compareProducts.length >= 4}
                >
                  <Plus className="h-4 w-4 mr-1" />
                  So sánh
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SelectProductModal
        open={visibleModalAddProduct}
        onClose={() => setVisibleModalAddProduct(false)}
        onSelect={(product) => {
          addProduct(product);
          setVisibleModalAddProduct(false);
        }}
        products={products}
      />
    </div>
  );
}
