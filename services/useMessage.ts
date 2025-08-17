import { apiClient } from ".";

export const askAi = async ({
  userId,
  message,
}: {
  userId: string;
  message: string;
}) => {
  try {
    const res = await apiClient.post(`/messages/${userId}/ask-ai`, { message });
    return res?.data;
  } catch (error) {
    console.log({ error });
  }
};
