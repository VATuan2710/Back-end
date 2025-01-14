import bcrypt from "bcrypt";
import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config({});

export const register = async (req, res) => {
  /**
   * Bước 1: Kiểm tra email đã đăng ký chưa
   * Bước 2: Mã hoá mật khẩu: bcrypt, bcryptjs
   * Bước 3: Lưu thông tin đăng ký vào database.
   * Bước 4: Thông báo thành công
   *
   * Lưu ý:
   * - Nếu đăng ký mà cho phép người dùng đăng nhập luôn thì cần tạo token và đưa vào cookie hoặc trả token cho người dùng.
   * - Nếu muốn xác thực email, thì gửi email (nodemailer) cho người dùng để kích hoạt.
   *
   * 	 */
  try {
    const { email, password, username, role } = req.body;
    console.log(email, password, username);

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email đã được sử dụng!" });
    }

    // bcrypt.genSalt(saltRounds, (err, salt) => {
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    // });

    const hashedPassword = await bcrypt.hash(password, 10);

    const savedUser = await User.create({
      email,
      username,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "Tạo tài khoản thành công!",
      user: {
        id: savedUser._id,
        email: savedUser.email,
        username: savedUser.username,
        role: savedUser.role,
      },
    });
  } catch (err) {
    console.error("Lỗi khi đăng ký:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

const { SECRET_KEY } = process.env;

export const login = async (req, res) => {
  /**
   * Bước 1: Kiểm tra email đã đăng ký chưa?
   * Bước 2: Từ email đã find được user, compare password.
   * Bước 3: Sign JWT (cài đặt jwt)
   * Bước 4: Sử dụng 1 trong các phương thức được học để duy trì trạng thái đăng nhập cho người dùng.
   * Bước 5: Thông báo.
   */
  try {
    const { email, password } = req.body;

    const userExist = await User.findOne({ email });
    if (!userExist) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    const isMatch = await bcrypt.compare(password, userExist.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Mật khẩu không chính xác!" });
    }

    const token = jwt.sign(
      { userId: userExist._id, role: userExist.role },
      SECRET_KEY,
      {
        expiresIn: "20s",
      }
    );
    userExist.password = undefined; // khi gửi dữ liệu json thì undefined, null,.. thì sẽ k được gửi
    return res.status(200).json({
      message: "Đăng nhập thành công!",
      token,
      user: {
        id: userExist._id,
        email: userExist.email,
        username: userExist.username,
        role: userExist.role,
      },
      // user: userExist,
    });
  } catch (err) {
    console.error("Lỗi khi đăng nhập:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};

export const refreshToken = async (req, res) => {};

export const getUserInfo = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "Người dùng không tồn tại!" });
    }

    return res.status(200).json({
      message: "Thông tin người dùng",
      user,
    });
  } catch (err) {
    console.error("Lỗi khi truy cập thông tin người dùng:", err);
    res.status(500).json({ message: "Lỗi server!" });
  }
};
