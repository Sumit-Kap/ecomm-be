module.exports = {
  authenticationMiddleware: async (req, res, next) => {
    try {
      const { authorization } = req.headers;
      const verify = await jsonWebTokens.verify(
        authorization,
        process.env.SECRET
      );
      await User.findOne({ _id: verify });
      next();
    } catch (err) {
      console.log(err);
      res.statusCode(401).json({ message: "user not authenticated" });
    }
  },
};

// Middleware to intercept the request and pass it on the next set of middlewares
