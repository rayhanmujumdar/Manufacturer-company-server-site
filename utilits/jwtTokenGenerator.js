const jwt = require("jsonwebtoken");
exports.jwtTokenGenerator = (email) => {
  return jwt.sign(
    {
      email: email,
    },
    process.env.TOKEN_SECRET,
    {
      expiresIn: "1d",
    }
  );
};
