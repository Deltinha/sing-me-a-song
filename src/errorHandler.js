export default async function errorHandler(err, req, res, next) {
  console.error(err);
  return res.sendStatus(500);
}
