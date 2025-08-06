"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Vui lòng kiểm tra lại mật khẩu xác nhận.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(name, email, password);
      if (success) {
        toast({
          title: "Đăng ký thành công",
          description: "Chào mừng bạn đến với Luxe!",
        });
        router.push("/");
      } else {
        toast({
          title: "Đăng ký thất bại",
          description: "Email đã được sử dụng hoặc có lỗi xảy ra.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Có lỗi xảy ra",
        description: "Vui lòng thử lại sau.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <Card className="w-full max-w-md border border-gray-200 shadow-none">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-light tracking-wide text-gray-900 uppercase">
              Đăng ký
            </CardTitle>
            <p className="text-sm text-gray-500 mt-1">
              Tạo tài khoản mới để bắt đầu trải nghiệm cùng{" "}
              <span className="font-medium">Luxe</span>
            </p>
          </CardHeader>

          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 text-sm">
                  Họ và tên
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Nguyễn Thị A"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="rounded-md border-gray-300 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="example@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="rounded-md border-gray-300 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 text-sm">
                  Mật khẩu
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="********"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="rounded-md border-gray-300 focus:ring-black"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="confirmPassword"
                  className="text-gray-700 text-sm"
                >
                  Xác nhận mật khẩu
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Nhập lại mật khẩu"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="rounded-md border-gray-300 focus:ring-black"
                />
              </div>

              <Button
                type="submit"
                className="w-full border border-black bg-white text-black hover:bg-black hover:text-white transition-all duration-300"
                disabled={isLoading}
              >
                {isLoading ? "Đang đăng ký..." : "Đăng ký"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  href="/auth/login"
                  className="text-black underline underline-offset-4 hover:opacity-80"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
