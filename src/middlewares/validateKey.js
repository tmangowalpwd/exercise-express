const secretKey = "123"

const validateKey = (req, res, next) => {
  if (req.headers["x-secret-key"] === secretKey) {
    console.log("User validated")
    next()
    return;
  }

  res.status(401).json({
    message: "User unauthorized"
  })
  return;
}

module.exports = validateKey