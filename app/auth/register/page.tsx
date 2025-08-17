"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";

export default function RegisterPage() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    fullname: {
      firstname: "",
      lastname: "",
    },
    username: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { toast } = useToast();
  const router = useRouter();

  const handleChange = (field: string, value: string) => {
    if (field === "firstname" || field === "lastname") {
      setForm((prev) => ({
        ...prev,
        fullname: {
          ...prev.fullname,
          [field]: value,
        },
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Vui lòng kiểm tra lại mật khẩu xác nhận.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      const success = await register(form);

      toast({
        title: "Đăng ký thành công",
        description: "Chào mừng bạn đến với 4Star!",
      });
      router.push("/");
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
              <span className="font-medium">4Star</span>
            </p>
          </CardHeader>

          <CardContent className="mt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstname" className="text-gray-700 text-sm">
                    Họ
                  </Label>
                  <Input
                    id="firstname"
                    type="text"
                    placeholder="Nguyễn"
                    value={form.fullname.firstname}
                    onChange={(e) => handleChange("firstname", e.target.value)}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="lastname" className="text-gray-700 text-sm">
                    Tên
                  </Label>
                  <Input
                    id="lastname"
                    type="text"
                    placeholder="Văn A"
                    value={form.fullname.lastname}
                    onChange={(e) => handleChange("lastname", e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="text-gray-700 text-sm">
                  Tên đăng nhập
                </Label>
                <Input
                  id="username"
                  type="text"
                  placeholder="username"
                  value={form.username}
                  onChange={(e) => handleChange("username", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 text-sm">
                  Số điện thoại
                </Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="0987654321"
                  value={form.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 text-sm">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
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
                  value={form.password}
                  onChange={(e) => handleChange("password", e.target.value)}
                  required
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
                  value={form.confirmPassword}
                  onChange={(e) =>
                    handleChange("confirmPassword", e.target.value)
                  }
                  required
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
