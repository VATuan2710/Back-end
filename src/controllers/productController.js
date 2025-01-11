import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const getAll = async (req, res) => {
  try {
    const products = await Product.find().populate("categoryId", "title");

    if (!products || products.length === 0) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm nào!",
      });
    }
    return res.status(200).send({
      message: "Lấy danh sách sản phẩm thành công!",
      data: products,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm!",
      error: error.message,
    });
  }
};

export const getById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate(
      "categoryId",
      "title"
    );

    if (!product) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm!",
      });
    }

    return res.status(200).send({
      message: "Lấy chi tiết sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi lấy chi tiết sản phẩm!",
      error: error.message,
    });
  }
};

export const create = async (req, res) => {
  try {
    const { categoryId, ...rest } = req.body;
    const product = await Product.create({
      ...rest,
      categoryId,
    });

    return res.status(201).send({
      message: "Tạo sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi tạo sản phẩm!",
      error: error.message,
    });
  }
};

export const updateById = async (req, res) => {
  try {
    const { categoryId, ...rest } = req.body;
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });

    if (!product) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm để cập nhật!",
      });
    }

    if (categoryId && categoryId !== product.categoryId.toString()) {
      await Category.findByIdAndUpdate(product.categoryId, {
        $pull: { products: { productId: product._id } },
      });

      await Category.findByIdAndUpdate(categoryId, {
        $push: { products: { productId: product._id } },
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { ...rest, categoryId },
      { new: true }
    );

    return res.status(200).send({
      message: "Cập nhật sản phẩm thành công!",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi cập nhật sản phẩm!",
      error: error.message,
    });
  }
};

export const softDeleteById = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        deletedAt: new Date(),
        isHidden: true,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm để xóa mềm!",
      });
    }

    return res.status(200).send({
      message: "Xóa mềm sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi xóa mềm sản phẩm!",
      error: error.message,
    });
  }
};

export const removeById = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm để xóa!",
      });
    }

    await Category.findByIdAndUpdate(product.categoryId, {
      $pull: { products: { productId: product._id } },
    });

    await Product.findByIdAndDelete(req.params.id);

    return res.status(200).send({
      message: "Xóa sản phẩm thành công!",
      data: product,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi xóa sản phẩm!",
      error: error.message,
    });
  }
};
