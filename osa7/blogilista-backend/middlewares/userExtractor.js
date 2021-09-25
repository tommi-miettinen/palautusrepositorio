import jwt from "jsonwebtoken";

const userExtractor = (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  req.user = decodedToken.id;
  next();
};

export default userExtractor;
