const postsDB = [
]

const postController = {
  getAllPosts: (req, res) => {
    if (!postsDB.length) {
      res.status(404).json({
        message: "No posts found"
      })
      return
    }

    res.status(200).json({
      message: "Get posts",
      result: postsDB
    })
  }
}

module.exports = postController