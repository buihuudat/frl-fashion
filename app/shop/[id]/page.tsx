import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import React from "react";
import { getShopById } from "@/services/useShop";
import { Header } from "@/components/header";

type Props = {
  params: {
    id: string;
  };
};

const ShopDetailPage = async ({ params }: Props) => {
  const shop = await getShopById(params.id);

  if (!shop) return notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 py-10">
        {/* Cover Image */}
        <div className="relative w-full h-64 overflow-hidden rounded-lg shadow">
          <Image
            src={shop?.image || "/placeholder.svg"}
            alt={shop.name}
            fill
            className="object-cover"
          />
        </div>

        {/* Shop Info */}
        <div className="mt-6 space-y-4">
          <h1 className="text-3xl font-bold">{shop.name}</h1>
          <p className="text-gray-600">{shop.bio}</p>

          {/* Owner Info */}
          <div className="flex items-center gap-3 mt-4">
            <Image
              src={shop.user.avatar || "/avatar-placeholder.png"}
              alt="avatar"
              width={40}
              height={40}
              className="rounded-full object-cover"
            />
            <span className="text-sm text-gray-700">
              {shop.user.fullname?.firstname} {shop.user.fullname?.lastname}
            </span>
          </div>

          {/* Details */}
          <div className="text-sm text-gray-500 space-y-1">
            <p>📅 Thành lập: {shop.startYear}</p>
            <p>🛍️ Sản phẩm: {shop.products.length}</p>
            <p>⭐ Đánh giá: {shop.averageStarRating}/5</p>
            <p>👥 Người theo dõi: {shop.followers.length}</p>
            <p>🗓️ Ngày tạo: {format(new Date(shop.createdAt), "dd/MM/yyyy")}</p>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Giới thiệu</h2>
            <p className="whitespace-pre-line text-gray-700">
              {shop.description}
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ShopDetailPage;
