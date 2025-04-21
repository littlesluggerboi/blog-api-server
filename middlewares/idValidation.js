import { param, validationResult } from "express-validator";

const idValidationMiddleWare = [
  param("id")
    .isInt()
    .customSanitizer((id) => parseInt(id)),
  async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(404).json({ message: "Resource not found." });
    next();
  },
];

export default idValidationMiddleWare;
