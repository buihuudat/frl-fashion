"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  Search,
  User,
  ShoppingBag,
  Heart,
  Menu,
  X,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/auth-context";
import { useCart } from "@/contexts/cart-context";
import { useWishlist } from "@/contexts/wishlist-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SearchDialog } from "./search-dialog";
import { CartSheet } from "./cart-sheet";
import { AIChat } from "./ai-chat";

import logoImg from "@/public/images/logo.png";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { user, logout } = useAuth();
  const { totalItems } = useCart();
  const { items: wishlistItems } = useWishlist();

  return (
    <>
      {/* Top Banner */}
      {/* <div className="bg-stone-600 text-white text-center py-2 text-sm">
        MIỄN PHÍ VẬN CHUYỂN cho đơn hàng trên 1.500.000đ
      </div> */}

      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-2xl font-serif text-gray-900">
                <Image
                  alt="logo"
                  src={logoImg}
                  width={60}
                  height={20}
                  className="object-contain"
                />
              </Link>
            </div>

            {/* Left Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-gray-900 hover:text-gray-600 text-sm font-medium"
              >
                TRANG CHỦ
              </Link>
              <Link
                href="/products"
                className="text-gray-900 hover:text-gray-600 text-sm font-medium"
              >
                SẢN PHẨM
              </Link>
              <Link
                href="/stores"
                className="text-gray-900 hover:text-gray-600 text-sm font-medium"
              >
                CỬA HÀNG
              </Link>
              <Link
                href="/news"
                className="text-gray-900 hover:text-gray-600 text-sm font-medium"
              >
                TIN TỨC
              </Link>
              <Link
                href="/compare"
                className="text-gray-900 hover:text-gray-600 text-sm font-medium"
              >
                SO SÁNH
              </Link>
            </nav>

            {/* Right Icons */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsChatOpen(true)}
              >
                <MessageCircle className="h-5 w-5" />
              </Button>

              <Link href="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-5 w-5" />
                  {wishlistItems.length > 0 && (
                    <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                      {wishlistItems.length}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingBag className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>

              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Image
                        src={
                          user.avatar || "/placeholder.svg?height=32&width=32"
                        }
                        alt={user.name}
                        width={32}
                        height={32}
                        className="rounded-full"
                      />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link href="/profile">Thông tin cá nhân</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/orders">Đơn hàng của tôi</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={logout}>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link href="/auth/login">
                  <Button variant="ghost" size="icon">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden border-t border-gray-200 py-4">
              <nav className="flex flex-col space-y-4">
                <Link
                  href="/"
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium"
                >
                  TRANG CHỦ
                </Link>
                <Link
                  href="/products"
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium"
                >
                  SẢN PHẨM
                </Link>
                <Link
                  href="/stores"
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium"
                >
                  CỬA HÀNG
                </Link>
                <Link
                  href="/news"
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium"
                >
                  TIN TỨC
                </Link>
                <Link
                  href="/compare"
                  className="text-gray-900 hover:text-gray-600 text-sm font-medium"
                >
                  SO SÁNH
                </Link>
              </nav>
            </div>
          )}
        </div>
      </header>

      <SearchDialog open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
      <AIChat open={isChatOpen} onOpenChange={setIsChatOpen} />
    </>
  );
}
