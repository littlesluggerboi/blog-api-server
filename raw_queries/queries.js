export const postStatsQuery = (days = 4) => {
  const query = `
    SELECT 
	    DATE_TRUNC('DAY', j) AS date, 
	    SUM(CASE WHEN bp.is_published = true THEN 1 ELSE 0 END) AS published,
	    COUNT(bp.id) AS posts
    FROM GENERATE_SERIES((NOW() - INTERVAL '${days} DAY'),now(), '1 DAY') AS j
	    LEFT JOIN "Blogs_Post" AS bp 
		    ON DATE_TRUNC('DAY', bp.created_at) = DATE_TRUNC('DAY', j)
	GROUP BY date
	ORDER BY date DESC;`;
  return query;
};

export const recentActivitiesQuery = (limit = 10) => {
  const query = `
SELECT 
	'post' AS type,
	CASE
		WHEN bu.username IS NULL THEN bu.email
		ELSE bu.username
	END AS subject,
	'created a post'AS verb,
	bp.title AS predicate,
	bp.created_at AS time,
	bp.id AS post_id
FROM "Blogs_Post" AS bp 
	INNER JOIN "Blogs_User" AS bu 
		ON bu.id = bp.author_id
UNION
SELECT 
	'post' AS type,
	CASE
		WHEN bu.username IS NULL THEN bu.email
		ELSE bu.username
	END AS subject,
	'edited a post'AS verb,
	bp.title AS predicate,
	bp.last_edited AS time,
	bp.id AS post_id
FROM "Blogs_Post" AS bp 
	INNER JOIN "Blogs_User" AS bu 
		ON bu.id = bp.author_id
WHERE bp.created_at != bp.last_edited
UNION
SELECT
	'comment' AS type,
	CASE
		WHEN bu.username IS NULL THEN bu.email
		ELSE bu.username
	END AS subject,
	'commented on a post' AS verb,
	bp.title AS predicate,
	bc.created_at AS time,
	bp.id AS post_id
FROM "Blogs_Comment" AS bc
	INNER JOIN "Blogs_User" AS bu
		ON bc.user_id = bu.id
	INNER JOIN "Blogs_Post" AS bp
		ON bc.post_id = bp.id
UNION
SELECT
	'comment' AS type,
	CASE
		WHEN bu.username IS NULL THEN bu.email
		ELSE bu.username
	END AS subject,
	'edited a comment on' AS verb,
	bp.title AS predicate,
	bc.updated_at AS time,
	bp.id AS post_id
FROM "Blogs_Comment" AS bc
	INNER JOIN "Blogs_User" AS bu
		ON bc.user_id = bu.id
	INNER JOIN "Blogs_Post" AS bp
		ON bc.post_id = bp.id
WHERE bc.updated_at != bc.created_at
ORDER BY time DESC
LIMIT ${limit};
  `;
  return query;
};
