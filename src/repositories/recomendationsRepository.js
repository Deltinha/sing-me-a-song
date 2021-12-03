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

export async function getAllRecomendations() {
  const recomendations = await connection.query(
    `
    SELECT
      *
    FROM
      recomendations;
  `
  );

  return recomendations.rows;
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

export async function downvoteRecomendation(id) {
  await connection.query(
    `
    UPDATE
      recomendations
    SET
      score = score - 1
    WHERE
      id=$1;
  `,
    [id]
  );
}

export async function removeRecomendation(id) {
  await connection.query(
    `
    DELETE FROM
      recomendations
    WHERE
      id=$1;
  `,
    [id]
  );
}
