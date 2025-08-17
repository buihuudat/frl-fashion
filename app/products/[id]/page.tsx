"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  Star,
  ShoppingBag,
  Share2,
  Minus,
  Plus,
  Send,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Header } from "@/components/header";
import { ProductCard } from "@/components/product-card";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import { useToast } from "@/hooks/use-toast";
import {
  addReview,
  getCommentProduct,
  getProductById,
  getProductSimilar,
} from "@/services/useProduct";
import { useParams, useSearchParams } from "next/navigation";
import { Product } from "@/types/product";
import { CartSheet } from "@/components/cart-sheet";
import { useAuth } from "@/contexts/auth-context";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

interface Review {
  id: string;
  user: string;
  avatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Color {
  name: string;
  value: string;
  image: string;
}

interface Size {
  name: string;
  available: boolean;
}

export default function ProductDetailPage() {
  const searchParams = useSearchParams();
  const params = useParams();
  const { user } = useAuth();

  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [newRating, setNewRating] = useState(0);
  const [newComment, setNewComment] = useState("");
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [productSimilar, setProductSimilar] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState("");

  useEffect(() => {
    const productParam = searchParams.get("product");
    const productState = productParam ? JSON.parse(productParam) : null;

    if (!params) return setIsLoading(false);
    const fetchDataProduct = async () => {
      await getProductById(params.id).then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      });
    };
    if (!productState) {
      fetchDataProduct();
    } else setProduct(productState);
    setIsLoading(false);
  }, [params]);

  useEffect(() => {
    if (!product) return;
    const fetchDataProductSimilar = async () => {
      await getProductSimilar({
        category: product.category,
        tags: product.tags,
      }).then((data) => {
        setProductSimilar(data);
      });
      const dataComments = await getCommentProduct(product.title);
      setProduct((prev: any) => ({
        ...prev,
        comments: dataComments,
      }));
    };
    fetchDataProductSimilar();
  }, [product?._id]);

  const { addItem } = useCart();
  const {
    addItem: addToWishlist,
    removeItem: removeFromWishlist,
    isInWishlist,
  } = useWishlist();
  const { toast } = useToast();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    }).format(price);
  };

  const handleAddToCart = () => {
    if (!product) return;

    addItem({
      ...product,
      id: product._id,
      name: product.title,
      price: product.lastPrice,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
    });

    toast({
      title: "Đã thêm vào giỏ hàng",
      description: `${product.title}  đã được thêm vào giỏ hàng.`,
    });
  };

  const handleToggleWishlist = () => {
    if (!product) return;

    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id);
      toast({
        title: "Đã xóa khỏi danh sách yêu thích",
        description: `${product.title} đã được xóa khỏi danh sách yêu thích.`,
      });
    } else {
      addToWishlist({
        id: product._id,
        name: product.title,
        price: product.price,
        image: product.images[0],
        originalPrice: product.lastPrice,
      });
      toast({
        title: "Đã thêm vào danh sách yêu thích",
        description: `${product.title} đã được thêm vào danh sách yêu thích.`,
      });
    }
  };

  const handleBuy = () => {
    if (!product) return;

    addItem({
      ...product,
      id: product._id,
      name: product.title,
      price: product.lastPrice,
      image: product.images[0],
      quantity: quantity,
      size: selectedSize,
    });

    setTimeout(() => {
      setIsCartOpen(true);
    }, 500);
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast({
        title: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để gửi đánh giá.",
        variant: "destructive",
      });
      return;
    }
    if (newRating === 0) {
      toast({
        title: "Chưa có xếp hạng",
        description: "Vui lòng chọn số sao để đánh giá.",
        variant: "destructive",
      });
      return;
    }
    if (!newComment.trim()) {
      toast({
        title: "Chưa có bình luận",
        description: "Vui lòng nhập bình luận của bạn.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmittingReview(true);
    try {
      const newReview = {
        productId: product?._id,
        rate: newRating || 5,
        content: newComment,
        userId: user._id,
      };

      await addReview(newReview).then(async () => {
        if (!product) return;
        const dataComments = await getCommentProduct(product.title);
        setProduct((prev: any) => ({
          ...prev,
          comments: dataComments,
        }));
      });

      if (product) {
        const updatedComments = [...product.comments, newReview];
        const newAverageRating =
          updatedComments.reduce((sum, r) => sum + r.rating, 0) /
          updatedComments.length;
      }

      setNewRating(0);
      setNewComment("");
      toast({
        title: "Gửi đánh giá thành công",
        description: "Cảm ơn bạn đã gửi đánh giá sản phẩm!",
      });
    } catch (error) {
      toast({
        title: "Gửi đánh giá thất bại",
        description: "Có lỗi xảy ra khi gửi đánh giá. Vui lòng thử lại.",
        variant: "destructive",
      });
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="bg-gray-300 h-96 rounded-lg"></div>
              <div className="space-y-4">
                <div className="bg-gray-300 h-8 rounded"></div>
                <div className="bg-gray-300 h-6 rounded w-1/2"></div>
                <div className="bg-gray-300 h-20 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Không tìm thấy sản phẩm</h1>
            <Link href="/products">
              <Button>Quay lại danh sách sản phẩm</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => {
    const count = product.comments.filter((c) => c.rate === star).length;
    return {
      star,
      count,
      percent:
        product.comments.length > 0
          ? (count / product.comments.length) * 100
          : 0,
    };
  });

  console.log({ product });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-gray-900">
              Trang chủ
            </Link>
            <span>/</span>
            <Link href="/products" className="hover:text-gray-900">
              Sản phẩm
            </Link>
            <span>/</span>
            <Link
              href={`/products?category=${product.category}`}
              className="hover:text-gray-900"
            >
              {product.category}
            </Link>
            <span>/</span>
            <span className="text-gray-900">{product.title}</span>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative">
              <Image
                src={product.images[selectedImageIndex]}
                alt={product.title}
                width={600}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover rounded-lg"
              />
              {product.lastPrice && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white">
                  {Math.round((1 - product.price / product.lastPrice) * 100)}%
                </Badge>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                onClick={handleToggleWishlist}
              >
                <Heart
                  className={`h-5 w-5 ${
                    isInWishlist(product._id)
                      ? "fill-red-500 text-red-500"
                      : "text-gray-600"
                  }`}
                />
              </Button>
            </div>

            <div className="flex space-x-2 overflow-x-auto">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImageIndex === index
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    width={80}
                    height={80}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <Badge variant="outline">{product.brand}</Badge>
                {product.currentQuantity ? (
                  <Badge className="bg-green-100 text-green-800">
                    Còn hàng
                  </Badge>
                ) : (
                  <Badge className="bg-red-100 text-red-800">Hết hàng</Badge>
                )}
              </div>
              <h1 className="text-3xl font-light mb-4">{product.title}</h1>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < product.averageStarRating ? "fill-current" : ""
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product?.averageStarRating} ({product?.comments.length}{" "}
                    đánh giá)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-red-600">
                  {formatPrice(product.lastPrice)}
                </span>
                {!!product.price && (
                  <span className="text-xl text-gray-500 line-through">
                    {formatPrice(product.price)}
                  </span>
                )}
              </div>

              {/* <div
                className="text-gray-600 leading-relaxed"
                dangerouslySetInnerHTML={{ __html: product.description }}
              ></div> */}
            </div>

            {/* Color Selection */}
            {/* <div>
              <h3 className="font-semibold mb-3">Màu sắc: {selectedColor}</h3>
              <div className="flex space-x-3">
                {product.colors.map((color) => (
                  <button
                    key={color?.name}
                    onClick={() => setSelectedColor(color)}
                    className={`w-10 h-10 rounded-full border-2 ${
                      selectedColor === color.name
                        ? "border-black"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: color.value }}
                    title={color.name}
                  />
                ))}
              </div>
            </div> */}

            {/* Size Selection */}
            <div>
              <h3 className="font-semibold mb-3">Kích thước: {selectedSize}</h3>
              <div className="flex space-x-2">
                {product?.tags.map((size) => (
                  <button
                    key={size.name}
                    onClick={() => setSelectedSize(size?.name)}
                    className={`px-4 py-2 border rounded-lg ${
                      selectedSize === size.name
                        ? "border-black bg-black text-white"
                        : "border-gray-200 text-gray-400 "
                    }`}
                  >
                    {size.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div>
              <h3 className="font-semibold mb-3">Số lượng</h3>
              <div className="flex items-center space-x-3">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="px-4 py-2 font-medium">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() =>
                      setQuantity(
                        Math.min(product.currentQuantity, quantity + 1)
                      )
                    }
                    disabled={quantity >= product.currentQuantity}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-gray-600">
                  ({product.currentQuantity} sản phẩm có sẵn)
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <Button
                className="w-full"
                size="lg"
                onClick={handleAddToCart}
                disabled={!product.currentQuantity || !selectedSize}
              >
                <ShoppingBag className="h-5 w-5 mr-2" />
                Thêm vào giỏ hàng
              </Button>
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={handleBuy}
                  disabled={!product.currentQuantity || !selectedSize}
                >
                  Mua ngay
                </Button>
                <Button variant="outline" size="icon">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">Mô tả chi tiết</TabsTrigger>
              <TabsTrigger value="reviews">
                Đánh giá ({product?.comments?.length})
              </TabsTrigger>
              <TabsTrigger value="care">Hướng dẫn bảo quản</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="prose max-w-none">
                    <h3 className="text-lg font-semibold mb-4">
                      Thông tin sản phẩm
                    </h3>
                    <div
                      className="mb-4"
                      dangerouslySetInnerHTML={{ __html: product.description }}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="text-3xl font-bold">
                        {product.comments.reduce(
                          (acc, cur) => acc + cur?.rate,
                          0
                        ) / product.comments.length}
                      </div>
                      <div>
                        <div className="flex text-yellow-400 mb-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i <
                                Math.floor(
                                  product.comments.reduce(
                                    (acc, cur) => acc + cur?.rate,
                                    0
                                  ) / product.comments.length
                                )
                                  ? "fill-current"
                                  : ""
                              }`}
                            />
                          ))}
                        </div>
                        <p className="text-sm text-gray-600">
                          {product.comments.length} đánh giá
                        </p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((star) => (
                        <div key={star} className="flex items-center space-x-2">
                          <span className="text-sm w-8">{star}★</span>
                          <Progress
                            value={
                              (product.comments.filter((c) => c.rating === star)
                                .length /
                                product.comments.length) *
                              100
                            }
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-8">
                            {Math.round(
                              (product.comments.filter((c) => c.rating === star)
                                .length /
                                product.comments.length) *
                                100
                            )}
                            %
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    {product?.comments?.map((review) => (
                      <div
                        key={review._id}
                        className="border-b pb-6 last:border-b-0"
                      >
                        <div className="flex items-start space-x-4">
                          <Avatar>
                            <AvatarImage
                              src={review?.auth?.avatar || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {review?.auth?.fullname?.fistname}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <h4 className="font-semibold">
                                {review?.auth?.fullname?.fistname}{" "}
                                {review?.auth?.fullname?.lastname}
                              </h4>
                              <div className="flex text-yellow-400">
                                {[...Array(5)].map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`h-3 w-3 ${
                                      i < review.rate ? "fill-current" : ""
                                    }`}
                                  />
                                ))}
                              </div>
                              <span className="text-sm text-gray-500">
                                {new Date(review.createdAt).toLocaleDateString(
                                  "vi-VN"
                                )}
                              </span>
                            </div>
                            <p className="text-gray-700 mb-2">
                              {review.content}
                            </p>
                            {/* <button className="text-sm text-gray-500 hover:text-gray-700">
                              Hữu ích ({review.helpful})
                            </button> */}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 pt-6 border-t">
                    <h3 className="text-lg font-semibold mb-4 pb-3">
                      Viết đánh giá của bạn
                    </h3>
                    <form onSubmit={handleSubmitReview} className="space-y-4">
                      <div>
                        {[...Array(5)].map((_, i) => {
                          const star = i + 1;
                          const rating = newRating;
                          return (
                            <button
                              key={i}
                              type="button"
                              onClick={() => setNewRating(star)}
                              className="text-yellow-400 focus:outline-none"
                            >
                              <Star
                                className={`h-6 w-6 ${
                                  star <= rating ? "fill-current" : ""
                                }`}
                              />
                            </button>
                          );
                        })}
                      </div>
                      <div>
                        <Label htmlFor="rating">Xếp hạng</Label>
                        <div className="space-y-2 mt-2">
                          {ratingCounts.map(({ star, count, percent }) => (
                            <div
                              key={star}
                              className="flex items-center space-x-2"
                            >
                              <span className="text-sm w-8">{star}★</span>
                              <Progress value={percent} className="flex-1" />
                              <span className="text-sm text-gray-600 w-8 text-right">
                                {count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="comment">Bình luận của bạn</Label>
                        <Textarea
                          className="mt-2"
                          id="comment"
                          placeholder="Chia sẻ cảm nhận của bạn về sản phẩm..."
                          value={newComment}
                          onChange={(e) => setNewComment(e.target.value)}
                          rows={4}
                          required
                        />
                      </div>
                      <Button type="submit" disabled={isSubmittingReview}>
                        {isSubmittingReview ? "Đang gửi..." : "Gửi đánh giá"}
                        <Send className="h-4 w-4 ml-2" />
                      </Button>
                    </form>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="care" className="mt-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Hướng dẫn bảo quản
                  </h3>

                  <ul className="space-y-3">
                    {(
                      product?.careInstructions ?? [
                        "Giặt tay với nước lạnh để giữ màu vải.",
                        "Không sử dụng thuốc tẩy.",
                        "Ủi ở nhiệt độ thấp, tránh phần in hoặc thêu.",
                        "Phơi ở nơi râm mát, tránh ánh nắng trực tiếp.",
                        "Không giặt chung với đồ có màu đậm.",
                      ]
                    ).map((instruction, index) => (
                      <li key={index} className="flex items-start">
                        <span className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-semibold mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <span>{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-light mb-8">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {productSimilar.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </div>
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
    </div>
  );
}
