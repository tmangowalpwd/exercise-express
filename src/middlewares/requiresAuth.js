const requiresAuth = (req, res, next) => {
  if (req.headers.cookie) {
    console.log("user logged in")
    return next()
  }

  return res.status(401).json({
    message: "User must be logged in to access this route"
  })
}

module.exports = requiresAuth