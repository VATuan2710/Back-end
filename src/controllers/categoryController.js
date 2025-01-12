import Category from "../models/Category.js";

export const create = async (req, res, next) => {
  try {
    const category = await Category.create(req.body);

    if (!category) {
      return res.status(404).send({
        message: "Không thể tạo sản phẩm!",
      });
    }
    return res.status(201).send({
      message: "Tạo sản phẩm thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi tạo sản phẩm!",
      error: error.message,
    });
  }
};

// export const create = async (req, res, next) => {
//   const category = await Category.create(req.body);
// };

export const getAll = async (req, res, next) => {
  try {
    const categories = await Category.find();
    if (!categories || categories.length === 0) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm nào!",
      });
    }
    return res.status(200).send({
      message: "Lấy danh sách sản phẩm thành công!",
      data: categories,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi lấy danh sách sản phẩm!",
      error: error.message,
    });
  }
};

export const getById = async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id);

    if (!category) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm!",
      });
    }
    return res.status(200).send({
      message: "Lấy chi tiết sản phẩm thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi lấy chi tiết sản phẩm!",
      error: error.message,
    });
  }
};

// export const getById = async (req, res, next) => {
//   const category = await Category.findById(req.params.id);

//   if (!category) {
//     return next(new Error("Category not found"));
//   }

//   return res.status(200).json(category);
// };

export const updateById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      timestamps: true,
    });

    if (!category) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm để cập nhật!",
      });
    }

    return res.status(200).send({
      message: "Cập nhật sản phẩm thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi cập nhật sản phẩm!",
      error: error.message,
    });
  }
};

export const softRemoveById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      {
        deletedAt: new Date(),
        isHidden: true,
      },
      { new: true }
    );

    if (!category) {
      return res.status(404).send({
        message: "Không tìm thấy danh mục để xóa mềm!",
      });
    }

    return res.status(200).send({
      message: "Xóa mềm danh mục thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi xóa mềm danh mục!",
      error: error.message,
    });
  }
};

export const removeById = async (req, res, next) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).send({
        message: "Không tìm thấy sản phẩm để xóa!",
      });
    }

    return res.status(200).send({
      message: "Xóa sản phẩm thành công!",
      data: category,
    });
  } catch (error) {
    return res.status(400).send({
      message: "Đã xảy ra lỗi khi xóa sản phẩm!",
      error: error.message,
    });
  }
};
