import passport from "passport";
import prisma from "../prisma/prismaClient.js";
const isAuthorized = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.blogs_Post.findUnique({ where: { id } });
    if (!post) return res.status(404).json({ message: "Resource not found" });
    if (post.author_id != req.user.id && req.user.role != "Admin")
      return res.status(401).json({ message: "Unauthorized" });
    next();
  } catch (error) {
    return next(error);
  }
};

const getPosts = async (req, res, next) => {
  try {
    const { user } = req;
    const filters = {};
    if (!user || user.role == "User") {
      filters.is_published = true;
    }
    const posts = await prisma.blogs_Post.findMany({
      include: { author: { select: { email: true, username: true } } },
      where: filters,
    });
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const conditionalUser = async (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    req.login(user, { session: false });
    next();
  })(req, res, next);
};

const getMyPosts = async (req, res, next) => {
  try {
    const { id } = req.user;
    const posts = await prisma.blogs_Post.findMany({
      include: { author: { select: { email: true, username: true } } },
      where: { author_id: parseInt(id) },
    });
    res.json({ posts });
  } catch (error) {
    next(error);
  }
};

const getPost = async (req, res, next) => {
  try {
    let { comments } = req.query;
    if (!comments || comments == "false" || comments != "true") {
      comments = false;
    } else {
      comments = {
        include: { user: { select: { username: true, email: true } } },
      };
    }
    const { id } = req.params;
    const post = await prisma.blogs_Post.findUnique({
      where: { id },
      include: {
        author: { select: { username: true, email: true } },
        comments: comments,
      },
    });
    if (!post) return res.status(404).json({ message: "Resource not found." });
    if (
      post.is_published ||
      (!post.is_published &&
        req.user &&
        (req.user.id == post.author_id || req.user.role == "Admin"))
    ) {
      return res.json({ post });
    }
    return res.status(404).json({ message: "Resource not found." });
  } catch (error) {
    next(error);
  }
};

const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;
    const post = await prisma.blogs_Post.update({ where: { id }, data });
    res.json({ message: "Successfully updated a post.", post });
  } catch (error) {
    next(error);
  }
};

const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const post = await prisma.blogs_Post.delete({ where: { id } });
    res.json({ message: "Successfully delete a post.", post });
  } catch (error) {
    next(error);
  }
};

const postPost = async (req, res, next) => {
  try {
    const data = req.body;
    data.author_id = req.user.id;
    const post = await prisma.blogs_Post.create({ data });
    res.json({ message: "Successfully created a post.", post });
  } catch (error) {
    next(error);
  }
};

const getPostsCount = async (req, res, next) => {
  try {
    let { isPublished } = req.query;
    const filter = {};
    if (isPublished) {
      if (isPublished == "true") {
        filter.is_published = true;
      } else if ((isPublished = "false")) {
        filter.is_published = false;
      }
    }
    const postsCount = await prisma.blogs_Post.count({ where: filter });
    return res.json({ count: postsCount });
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
  getPostsCount,
  getMyPosts,
  conditionalUser,
};
