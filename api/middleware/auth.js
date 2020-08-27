const permission = (jwt, jwtScrete) => {
  const loginAuth = async (req, res, next) => {
    try {
      const token = req.header("x-auth-header");

      if (!token) return res.json("please login");

      const decode = await jwt.verify(token, jwtScrete);
      next();
    } catch (err) {
      if (err) {
        console.log(err);
        res.json("Please sign in");
      }
    }
  };

  return {
    loginAuth,
  };
};

module.exports = permission;
