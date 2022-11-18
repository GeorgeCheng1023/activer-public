const allowOrigins = 'http://localhost:3000';

const credentials = (req, res, next) => {
  const origin = req.headers.origin;
  if (allowOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Credentials', true);
  }
  next();
}