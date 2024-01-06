const express = require("express");
const {
  getPost,
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
} = require("../controllers/postController");
const { authGuard, adminGuard } = require("../Middlewares/authMiddleware");

const router = express.Router();

router.post("/", authGuard, createPost);
router.get("/", getAllPosts);
router
  .route("/:slug")
  .put(authGuard, updatePost)
  .delete(deletePost)
  .get(getPost);

module.exports = router;
