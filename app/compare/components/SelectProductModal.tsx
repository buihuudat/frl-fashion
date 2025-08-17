import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Product } from "@/types/product";
import Image from "next/image";

interface SelectProductModalProps {
  open: boolean;
  onClose: () => void;
  onSelect: (product: Product) => void;
  products: Product[];
}

export const SelectProductModal = ({
  open,
  onClose,
  onSelect,
  products,
}: SelectProductModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Chọn sản phẩm để so sánh</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          {products.map((product) => (
            <div
              key={product._id}
              onClick={() => onSelect(product)}
              className="border rounded-lg p-4 cursor-pointer hover:shadow transition"
            >
              <Image
                src={product.images?.[0]}
                alt={product.title}
                width={200}
                height={250}
                className="object-cover w-full h-48 mb-2 rounded"
              />
              <h4 className="font-medium text-sm">{product.title}</h4>
              <p className="text-sm text-gray-500">
                {new Intl.NumberFormat("vi-VN", {
                  style: "currency",
                  currency: "VND",
                }).format(product.price)}
              </p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
