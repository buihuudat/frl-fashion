import Link from "next/link";
import { Facebook, Instagram, Youtube, MessageCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-serif text-white mb-4 inline-block"
            >
              4Star
            </Link>
            <p className="text-gray-300 text-sm leading-relaxed">
              Thương hiệu thời trang cao cấp dành cho phụ nữ hiện đại, mang đến
              phong cách thanh lịch và sang trọng.
            </p>
            <div className="flex space-x-4 pt-4">
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Youtube className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Products Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Sản phẩm</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/products?category=ao-so-mi"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Áo sơ mi
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=vay"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Váy
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=ao-khoac"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Áo khoác
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=phu-kien"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Phụ kiện
                </Link>
              </li>
            </ul>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">Hỗ trợ</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Liên hệ
                </Link>
              </li>
              <li>
                <Link
                  href="/faq"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Câu hỏi thường gặp
                </Link>
              </li>
              <li>
                <Link
                  href="/size-guide"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Hướng dẫn chọn size
                </Link>
              </li>
              <li>
                <Link
                  href="/shipping"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Chính sách giao hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/returns"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Đổi trả
                </Link>
              </li>
            </ul>
          </div>

          {/* Company Info Section */}
          <div>
            <h3 className="text-lg font-semibold mb-6 text-white">
              Về chúng tôi
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/about-us"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Giới thiệu
                </Link>
              </li>
              <li>
                <Link
                  href="/stores"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Hệ thống cửa hàng
                </Link>
              </li>
              <li>
                <Link
                  href="/news"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Tin tức
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Tuyển dụng
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 Luxe. Tất cả quyền được bảo lưu.
            </p>
            <div className="flex space-x-6">
              <Link
                href="/privacy"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Chính sách bảo mật
              </Link>
              <Link
                href="/terms"
                className="text-gray-400 hover:text-white text-sm transition-colors"
              >
                Điều khoản sử dụng
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
