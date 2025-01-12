import { z } from "zod";

export const registerSchema = z.object({
  email: z
    .string()
    .min(1, { message: "cần nhập email" })
    .email({ message: "cần đúng định dạng email" }),
  password: z
    .string()
    .min(1, { message: "cần nhập password" })
    .min(6, { message: "mật khẩu quá ngắn" }),
  username: z.string().min(1, { message: "cần nhập tên người dùng" }),
  role: z.string().optional(),
});

export const loginSchema = z.object({
  email: z.string().min(1, { message: "cần nhập email" }).email(),
  password: z
    .string()
    .min(1, { message: "cần nhập password" })
    .min(6, { message: "mật khẩu quá ngắn" }),
});
