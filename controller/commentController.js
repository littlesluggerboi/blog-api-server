
import prisma from "../prisma/prismaClient.js";
const isAuthorized = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await prisma.blogs_Comment.findUnique({ where: { id } });
    if (!comment)
      return res.status(404).json({ message: "Resource not found" });
    if (comment.user_id != req.user.id && req.user.role != "admin")
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    next(error);
  }
};

const getComments = async (req, res, next) => {
  try {
    const comments = await prisma.blogs_Comment.findMany();
    res.json({ comments });
  } catch (error) {
    next(error);
  }
};

const getComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await prisma.blogs_Comment.findUnique({ where: id });
    if (!comment) res.status(404).send({ message: "Resource not found" });
    res.send({ comment });
  } catch (error) {
    next(error);
  }
};

const postComment = async (req, res, next) => {
  try {
    const comment = await prisma.blogs_Comment.create({
      data: { ...req.body, user_id: req.user.id },
    });
    res.send({ message: "Successfully create a comment.", comment });
  } catch (error) {
    next(error);
  }
};

const updateComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const comment = await prisma.blogs_Comment.update({
      where: { id },
      data,
    });
    res.json({ message: "Successfully updated comment.", comment });
  } catch (error) {
    next(error);
  }
};

const deleteComment = async (req, res, next) => {
  try {
    const { id } = req.params;
    const comment = await prisma.blogs_Comment.delete({
      where: { id },
    });
    res.json({ message: "Successfully deleted comment.", comment });
  } catch (error) {
    next(error);
  }
};

export default {
  isAuthorized,
  getComments,
  getComment,
  postComment,
  updateComment,
  deleteComment,
};
