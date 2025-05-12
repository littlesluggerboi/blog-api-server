import prisma from "../prisma/prismaClient.js";
import {
  postStatsQuery,
  recentActivitiesQuery,
} from "../raw_queries/queries.js";

const getPostsStats = async (req, res, next) => {
  try {
    let { days } = req.query;
    const query = postStatsQuery(days);
    let stats = await prisma.$queryRawUnsafe(query);
    stats = stats.map((val) => {
      val.date = new Date(val.date).toISOString();
      val.published = parseInt(val.published);
      val.posts = parseInt(val.posts);
      return val;
    });
    res.json({ stats });
  } catch (error) {
    next(error);
  }
};

const getRecentActivities = async (req, res, next) => {
  try {
    let { items } = req.query;
    if (!items) {
      items = 10;
    }
    const query = recentActivitiesQuery(items);
    const recent_activities = await prisma.$queryRawUnsafe(query);
    res.json({ recent_activities });
  } catch (error) {
    next(error);
  }
};

export default { getPostsStats, getRecentActivities };
