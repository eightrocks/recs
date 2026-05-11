import { Pool } from 'pg';

const pool =
  globalThis.__pgPool ??
  new Pool({
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD,
    host: process.env.PG_HOST,
    port: process.env.PG_PORT ? Number(process.env.PG_PORT) : undefined,
    database: process.env.PG_DATABASE,
    max: process.env.PG_POOL_MAX ? Number(process.env.PG_POOL_MAX) : 10,
    idleTimeoutMillis: process.env.PG_POOL_IDLE_TIMEOUT_MS ? Number(process.env.PG_POOL_IDLE_TIMEOUT_MS) : 30_000,
    connectionTimeoutMillis: process.env.PG_POOL_CONN_TIMEOUT_MS
      ? Number(process.env.PG_POOL_CONN_TIMEOUT_MS)
      : 5_000,
  });

// Cache across hot reloads in dev
globalThis.__pgPool = pool;

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get('name') || '';
  const heightMin = searchParams.get('heightMin') ? parseFloat(searchParams.get('heightMin')) : null;
  const heightMax = searchParams.get('heightMax') ? parseFloat(searchParams.get('heightMax')) : null;
  const verticalMin = searchParams.get('verticalMin') ? parseFloat(searchParams.get('verticalMin')) : null;
  const verticalMax = searchParams.get('verticalMax') ? parseFloat(searchParams.get('verticalMax')) : null;
  const weightMin = searchParams.get('weightMin') ? parseFloat(searchParams.get('weightMin')) : null;
  const weightMax = searchParams.get('weightMax') ? parseFloat(searchParams.get('weightMax')) : null;
  const seasonMin = searchParams.get('seasonMin') ? parseInt(searchParams.get('seasonMin')) : null;
  const seasonMax = searchParams.get('seasonMax') ? parseInt(searchParams.get('seasonMax')) : null;
  const positions = searchParams.get('positions') ? searchParams.get('positions').split(',') : [];
  const standingVerticalMin = searchParams.get('standingVerticalMin') ? parseFloat(searchParams.get('standingVerticalMin')) : null;
  const standingVerticalMax = searchParams.get('standingVerticalMax') ? parseFloat(searchParams.get('standingVerticalMax')) : null;
  const threeQuarterSprintMin = searchParams.get('threeQuarterSprintMin') ? parseFloat(searchParams.get('threeQuarterSprintMin')) : null;
  const threeQuarterSprintMax = searchParams.get('threeQuarterSprintMax') ? parseFloat(searchParams.get('threeQuarterSprintMax')) : null;
  const standingReachMin = searchParams.get('standingReachMin') ? parseFloat(searchParams.get('standingReachMin')) : null;
  const standingReachMax = searchParams.get('standingReachMax') ? parseFloat(searchParams.get('standingReachMax')) : null;
  const wingspanMin = searchParams.get('wingspanMin') ? parseFloat(searchParams.get('wingspanMin')) : null;
  const wingspanMax = searchParams.get('wingspanMax') ? parseFloat(searchParams.get('wingspanMax')) : null;
  const handWidthMin = searchParams.get('handWidthMin') ? parseFloat(searchParams.get('handWidthMin')) : null;
  const handWidthMax = searchParams.get('handWidthMax') ? parseFloat(searchParams.get('handWidthMax')) : null;
  const handLengthMin = searchParams.get('handLengthMin') ? parseFloat(searchParams.get('handLengthMin')) : null;
  const handLengthMax = searchParams.get('handLengthMax') ? parseFloat(searchParams.get('handLengthMax')) : null;
  const laneAgilityMin = searchParams.get('laneAgilityMin') ? parseFloat(searchParams.get('laneAgilityMin')) : null;
  const laneAgilityMax = searchParams.get('laneAgilityMax') ? parseFloat(searchParams.get('laneAgilityMax')) : null;
  const page = searchParams.get('page') ? Math.max(1, parseInt(searchParams.get('page'), 10) || 1) : 1;
  const pageSizeRaw = searchParams.get('pageSize')
    ? Math.max(1, parseInt(searchParams.get('pageSize'), 10) || 15)
    : 15;
  const pageSize = Math.min(pageSizeRaw, 100);
  const offset = (page - 1) * pageSize;

  try {
    let query = `
      SELECT
        COUNT(*) OVER()::int AS total_count,
        player_id,
        player_name,
        position,
        season,
        height_wo_shoes_ft_in,
        weight,
        max_vertical_leap,
        standing_vertical_leap,
        three_quarter_sprint,
        standing_reach_ft_in,
        wingspan_ft_in,
        lane_agility_time,
        hand_width,
        hand_length
      FROM public.float_players
      WHERE 1=1
    `;
    const values = [];
    let paramIndex = 1;

    if (name) {
      query += ` AND player_name ILIKE $${paramIndex}`;
      values.push(`%${name}%`);
      paramIndex++;
    }

    if (heightMin !== null) {
      query += ` AND height_wo_shoes_ft_in >= $${paramIndex}`;
      values.push(heightMin);
      paramIndex++;
    }

    if (heightMax !== null) {
      query += ` AND height_wo_shoes_ft_in <= $${paramIndex}`;
      values.push(heightMax);
      paramIndex++;
    }

    if (verticalMin !== null) {
      query += ` AND max_vertical_leap >= $${paramIndex}`;
      values.push(verticalMin);
      paramIndex++;
    }

    if (verticalMax !== null) {
      query += ` AND max_vertical_leap <= $${paramIndex}`;
      values.push(verticalMax);
      paramIndex++;
    }

    if (weightMin !== null) {
      query += ` AND weight >= $${paramIndex}`;
      values.push(weightMin);
      paramIndex++;
    }

    if (weightMax !== null) {
      query += ` AND weight <= $${paramIndex}`;
      values.push(weightMax);
      paramIndex++;
    }

    if (seasonMin !== null) {
      query += ` AND season >= $${paramIndex}`;
      values.push(seasonMin);
      paramIndex++;
    }

    if (seasonMax !== null) {
      query += ` AND season <= $${paramIndex}`;
      values.push(seasonMax);
      paramIndex++;
    }

    if (positions.length > 0) {
      const posConditions = positions.map(() => `position LIKE $${paramIndex}`).join(' OR ');
      query += ` AND (${posConditions})`;
      positions.forEach(pos => {
        values.push(`%${pos}%`);
        paramIndex++;
      });
    }

    if (standingVerticalMin !== null) {
      query += ` AND standing_vertical_leap >= $${paramIndex}`;
      values.push(standingVerticalMin);
      paramIndex++;
    }

    if (standingVerticalMax !== null) {
      query += ` AND standing_vertical_leap <= $${paramIndex}`;
      values.push(standingVerticalMax);
      paramIndex++;
    }

    if (threeQuarterSprintMin !== null) {
      query += ` AND three_quarter_sprint >= $${paramIndex}`;
      values.push(threeQuarterSprintMin);
      paramIndex++;
    }

    if (threeQuarterSprintMax !== null) {
      query += ` AND three_quarter_sprint <= $${paramIndex}`;
      values.push(threeQuarterSprintMax);
      paramIndex++;
    }

    if (standingReachMin !== null) {
      query += ` AND standing_reach_ft_in >= $${paramIndex}`;
      values.push(standingReachMin);
      paramIndex++;
    }

    if (standingReachMax !== null) {
      query += ` AND standing_reach_ft_in <= $${paramIndex}`;
      values.push(standingReachMax);
      paramIndex++;
    }

    if (wingspanMin !== null) {
      query += ` AND wingspan_ft_in >= $${paramIndex}`;
      values.push(wingspanMin);
      paramIndex++;
    }

    if (wingspanMax !== null) {
      query += ` AND wingspan_ft_in <= $${paramIndex}`;
      values.push(wingspanMax);
      paramIndex++;
    }

    if (handWidthMin !== null) {
      query += ` AND hand_width >= $${paramIndex}`;
      values.push(handWidthMin);
      paramIndex++;
    }

    if (handWidthMax !== null) {
      query += ` AND hand_width <= $${paramIndex}`;
      values.push(handWidthMax);
      paramIndex++;
    }

    if (handLengthMin !== null) {
      query += ` AND hand_length >= $${paramIndex}`;
      values.push(handLengthMin);
      paramIndex++;
    }

    if (handLengthMax !== null) {
      query += ` AND hand_length <= $${paramIndex}`;
      values.push(handLengthMax);
      paramIndex++;
    }

    if (laneAgilityMin !== null) {
      query += ` AND lane_agility_time >= $${paramIndex}`;
      values.push(laneAgilityMin);
      paramIndex++;
    }

    if (laneAgilityMax !== null) {
      query += ` AND lane_agility_time <= $${paramIndex}`;
      values.push(laneAgilityMax);
      paramIndex++;
    }

    const res = await pool.query(query, values);

    const total = res.rows.length > 0 ? Number(res.rows[0]?.total_count ?? 0) : 0;
    const items = res.rows.map(({ total_count, ...rest }) => rest);
    return Response.json({ items, total, page, pageSize });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Database error' }, { status: 500 });
  }
}