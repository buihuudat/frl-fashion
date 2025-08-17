import { RegisterType } from "@/types/authType";
import { apiClient } from ".";
import { toast } from "@/hooks/use-toast";
import { User } from "@/contexts/auth-context";

export const updateAvatar: (props: {
  _id: string;
  image: string;
}) => Promise<void> = async ({ _id, image }) => {
  try {
    const res = await apiClient.post(`/users/${_id}/change-avatar`, {
      _id,
      image,
    });

    const currentUser = localStorage.getItem("USER_DATA");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      user.avatar = image;
      localStorage.setItem("USER_DATA", JSON.stringify(user));
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      description: "Cập nhật ảnh đại diện thất bại",
      variant: "destructive",
    });
  }
};

export const updateUser: (payload: User) => Promise<void> = async (payload) => {
  try {
    const res = await apiClient.put(`/users/${payload._id}/`, payload);
    const currentUser = localStorage.getItem("USER_DATA");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      user.fullname = payload.fullname;
      user.phone = payload.phone;
      user.username = payload.username;
      user.email = payload.email;
      localStorage.setItem("USER_DATA", JSON.stringify(user));
      toast({
        title: "Cập nhật thông tin thành công",
      });
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      description: "Cập nhật thất bại",
      variant: "destructive",
    });
  }
};

export const updatePassUser: ({
  password: string,
  _id: string,
}) => Promise<void> = async (payload) => {
  try {
    const currentUser = localStorage.getItem("USER_DATA");
    if (currentUser) {
      const user = JSON.parse(currentUser);
      const res = await apiClient.put(`/users/${payload._id}/`, {
        ...user,
        password: payload.password,
      });
      localStorage.setItem("USER_DATA", JSON.stringify(user));
      toast({
        title: "Cập nhật thông tin thành công",
      });
    }
  } catch (error) {
    toast({
      title: "Lỗi",
      description: "Cập nhật thất bại",
      variant: "destructive",
    });
  }
};
