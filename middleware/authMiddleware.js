const protect = (req, res, next) => {
  // Custom check for authentication headers or tokens
  let token = req.headers.authorization;
  if (token && token.startsWith('Bearer')) {
    // Proceed logic here
    next();
  } else {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };