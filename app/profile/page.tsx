"use client";

import type React from "react";

import { useState, useEffect, ChangeEvent, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Header } from "@/components/header";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { getBaseImage, imageUpload } from "@/lib/utils";
import { updateAvatar, updatePassUser } from "@/services/useAuth";

export default function ProfilePage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { user, updateProfile, isLoading: authLoading } = useAuth();
  const { toast } = useToast();
  const router = useRouter();

  const [fullName, setFullName] = useState({
    firstname: "",
    lastname: "",
  });
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isAvatarUploading, setIsAvatarUploading] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/auth/login"); // Redirect if not logged in
      toast({
        title: "Bạn chưa đăng nhập",
        description: "Vui lòng đăng nhập để xem thông tin cá nhân.",
        variant: "destructive",
      });
    } else if (user) {
      setFullName(user.fullname || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.addressText || "");
      setAvatarUrl(user.avatar);
    }
  }, [user, authLoading, router, toast]);

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const success = await updateProfile({
        fullname: fullName,
        email: email,
        phone: phone,
        addressText: address,
      });
      if (success) {
        toast({
          title: "Cập nhật thành công",
          description: "Thông tin cá nhân của bạn đã được cập nhật.",
        });
      } else {
        toast({
          title: "Cập nhật thất bại",
          description: "Có lỗi xảy ra khi cập nhật thông tin.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Lỗi",
        description: "Không thể cập nhật thông tin cá nhân.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      toast({
        title: "Mật khẩu không khớp",
        description: "Mật khẩu mới và xác nhận mật khẩu không khớp.",
        variant: "destructive",
      });
      return;
    }
    if (newPassword.length < 8) {
      toast({
        title: "Mật khẩu quá ngắn",
        description: "Mật khẩu mới phải có ít nhất 8 ký tự.",
        variant: "destructive",
      });
      return;
    }

    setIsChangingPassword(true);
    try {
      await updatePassUser({
        _id: user?._id,
        password: newPassword,
      });
      toast({
        title: "Đổi mật khẩu thành công",
        description: "Mật khẩu của bạn đã được thay đổi.",
      });
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      toast({
        title: "Đổi mật khẩu thất bại",
        description: "Mật khẩu hiện tại không đúng hoặc có lỗi xảy ra.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-12">
            <p className="text-gray-500">Đang tải thông tin người dùng...</p>
          </div>
        </div>
      </div>
    );
  }

  const onChangeImage = async (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    setIsAvatarUploading(true);
    const baseImage = await getBaseImage(e);
    if (baseImage && baseImage.length > 0) {
      const result = await imageUpload(baseImage[0].data);
      try {
        await updateAvatar({
          _id: user?._id!,
          image: result,
        });
      } catch (error) {
      } finally {
        setAvatarUrl(result);
        setIsAvatarUploading(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-light mb-8">Thông tin cá nhân</h1>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Thông tin cá nhân
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileUpdate} className="space-y-6">
              {/* Avatar */}
              <div className="flex flex-col items-center gap-3">
                <Avatar className="h-24 w-24 ring-2 ring-gray-300">
                  <AvatarImage
                    src={avatarUrl}
                    alt={fullName?.firstname}
                    className="object-cover"
                  />

                  <AvatarFallback>
                    {fullName
                      ? fullName.firstname + " " + fullName.lastname
                      : ""}
                  </AvatarFallback>
                </Avatar>
                <input
                  ref={fileInputRef}
                  accept="image/*"
                  id="avatar-upload"
                  hidden
                  type="file"
                  onChange={onChangeImage}
                />

                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                >
                  Thay đổi ảnh đại diện
                </Button>
              </div>

              {/* Thông tin */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-row items-center justify-between">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm text-gray-700"
                    >
                      Họ
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      value={fullName.firstname}
                      onChange={(e) =>
                        setFullName((prev) => ({
                          ...prev,
                          firstname: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm text-gray-700">
                      Tên
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      value={fullName.lastname}
                      onChange={(e) =>
                        setFullName((prev) => ({
                          ...prev,
                          lastname: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm text-gray-700">
                    Email
                  </Label>
                  <Input id="email" type="email" value={email} disabled />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="text-sm text-gray-700">
                    Số điện thoại
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Nhập số điện thoại"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address" className="text-sm text-gray-700">
                    Địa chỉ
                  </Label>
                  <Input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Nhập địa chỉ của bạn"
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isSaving}
                className="w-full md:w-fit"
              >
                {isSaving ? "Đang lưu..." : "Lưu thay đổi"}
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-800">
              Đổi mật khẩu
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleChangePassword} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-sm text-gray-700"
                >
                  Mật khẩu hiện tại
                </Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="newPassword" className="text-sm text-gray-700">
                  Mật khẩu mới
                </Label>
                <Input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label
                  htmlFor="confirmNewPassword"
                  className="text-sm text-gray-700"
                >
                  Xác nhận mật khẩu mới
                </Label>
                <Input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                disabled={isChangingPassword}
                className="w-full md:w-fit"
              >
                {isChangingPassword ? "Đang đổi..." : "Đổi mật khẩu"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
