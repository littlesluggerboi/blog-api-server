import prisma from "../prisma/prismaClient";
const isAuthorized = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.blogs_Post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Resource not found" });
    if (post.author_id !== req.user.id && res.user.role == "admin")
      return res.status(401).json({ message: "Unauthorized" });
    return next();
  } catch (error) {
    return next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const posts = await prisma.blogs_Post.findMany();
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.blogs_Post.findUnique({ where: { id } });
    if (!post) return res.status(400).json({ message: "Resource not found." });
    return res.json({ post });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const data = req.body;
    const post = await prisma.blogs_Post.update({ where: { id }, data });
    res.json({ message: "Successfully updated a post.", post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    const post = await prisma.blogs_Post.delete({ where: { id } });
    res.json({ message: "Successfully delete a post.", post });
  } catch (error) {
    next(error);
  }
};

const postPost = async (req, res, next) => {
  try {
    const data = req.body;
    data.user_id = req.user.id;
    const post = await prisma.blogs_Post.create({ data });
    res.json({ message: "Successfully created a post.", post });
  } catch (error) {
    next(error);
  }
};
export default {
  isAuthorized,
  getPosts,
  getPost,
  updatePost,
  deletePost,
  postPost,
};
