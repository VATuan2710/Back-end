export const validBodyRequest = (schemaValid) => (req, res, next) => {
  try {
    const data = schemaValid.parse(req.body);
    console.log(`data valid: ${data}`);

    // console.log(req.body);
    // if (!req.body.title || req.body.title.length < 6) {
    // 	throw new Error("title là bắt buộc và phải đủ 6 ký tự");
    // }

    // nếu body ngon rồi -> next()
    next();
  } catch (err) {
    // Cach 1: su dung thu vien
    // const errors = err.errors.map((item) => `${item.path}: ${item.message}`);
    // res.status(400).send({ errors });

    // console.log(err);
    // res.status(400).json(err);
    const errors = err.errors.map((item) => `${item.path}: ${item.message}`);
    res.status(400).send({ errors });
  }
};
