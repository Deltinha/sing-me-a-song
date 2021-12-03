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
