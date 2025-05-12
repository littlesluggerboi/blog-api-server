import prisma from "../prisma/prismaClient.js";

const isAuthorized = async (req, res, next) => {
  if (req.user.role != "Admin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};

const getUsers = async (req, res, next) => {
  try {
    let users = await prisma.blogs_User.findMany({
      omit: { password: true },
      include: {
        _count: {
          select: { posts: true },
        },
      },
      where: {
        id: { not: parseInt(req.user.id) },
      },
    });
    users = users.map((val) => {
      const { _count, ...user } = val;
      user.posts = _count.posts;
      return user;
    });
    res.json({ users });
  } catch (error) {
    next(error);
  }
};

const getUsersCount = async (req, res, next) => {
  try {
    const usersCount = await prisma.blogs_User.count();
    res.json({ count: usersCount });
  } catch (error) {
    next(error);
  }
};

export default {
  isAuthorized,
  getUsers,
  getUsersCount,
};
