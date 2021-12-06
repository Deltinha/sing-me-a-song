import connection from '../database/database';

export async function insertRecommendation({ name, youtubeLink }) {
  await connection.query(
    `
    INSERT INTO recommendations
      (name, "youtubeLink")
    VALUES
      ($1, $2);
  `,
    [name, youtubeLink]
  );
}

export async function getAllRecommendations() {
  const recommendations = await connection.query(
    `
    SELECT
      *
    FROM
      recommendations;
  `
  );

  return recommendations.rows;
}

export async function getRecommendationById(id) {
  const recommendation = await connection.query(
    `
    SELECT
      *
    FROM
      recommendations
    WHERE
      id=$1;
  `,
    [id]
  );

  return recommendation.rows[0];
}

export async function upvoteRecommendation(id) {
  await connection.query(
    `
    UPDATE
      recommendations
    SET
      score = score + 1
    WHERE
      id=$1;
  `,
    [id]
  );
}

export async function downvoteRecommendation(id) {
  await connection.query(
    `
    UPDATE
      recommendations
    SET
      score = score - 1
    WHERE
      id=$1;
  `,
    [id]
  );
}

export async function removeRecommendation(id) {
  await connection.query(
    `
    DELETE FROM
      recommendations
    WHERE
      id=$1;
  `,
    [id]
  );
}

export async function getTopRecommendations(amount) {
  const recommendations = await connection.query(
    `
    SELECT
      *
    FROM
      recommendations
    ORDER BY
      score DESC
    LIMIT
      $1 
  `,
    [amount]
  );

  return recommendations.rows;
}
