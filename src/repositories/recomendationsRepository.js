import connection from '../database/database';

export async function insertRecomendation({ name, youtubeLink }) {
  await connection.query(
    `
    INSERT INTO recomendations
      (name, "youtubeLink")
    VALUES
      ($1, $2);
  `,
    [name, youtubeLink]
  );
}

export async function getRecomendationById(id) {
  const recomendation = await connection.query(
    `
    SELECT
      *
    FROM
      recomendations
    WHERE
      id=$1;
  `,
    [id]
  );

  return recomendation.rows[0];
}

export async function upvoteRecomendation(id) {
  await connection.query(
    `
    UPDATE
      recomendations
    SET
      score = score + 1
    WHERE
      id=$1;
  `,
    [id]
  );
}
