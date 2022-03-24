const postsDB = [
  {
    userId: 1,
    location: "BSD",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    numberOfLikes: 213424,
    caption:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore enim praesentium inventore asperiores sunt corporis unde dicta ipsa dolorum voluptatibus dolor, odio nobis est consequuntur labore!",
    id: 1,
    username: "seto",
  },
  {
    userId: 1,
    location: "Bandung",
    imageUrl:
      "https://images.unsplash.com/photo-1644982648600-4583461837f8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1724&q=80",
    numberOfLikes: 423,
    caption:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore enim praesentium inventore asperiores sunt corporis unde dicta ipsa dolorum voluptatibus dolor, odio nobis est consequuntur labore!",
    id: 1,
    username: "mark",
  },
  {
    userId: 1,
    location: "Jakarta",
    imageUrl:
      "https://images.unsplash.com/photo-1646194840487-e8d3586533a5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1626&q=80",
    numberOfLikes: 52342,
    caption:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero dolore enim praesentium inventore asperiores sunt corporis unde dicta ipsa dolorum voluptatibus dolor, odio nobis est consequuntur labore!",
    id: 1,
    username: "bill",
  }
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