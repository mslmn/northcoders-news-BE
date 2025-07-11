const express = require("express");
const app = express();
const db = require("./db/connection.js");
const cors = require("cors");
const { getEndpoints } = require("./controllers/api.controllers.js");
const { getAllTopics } = require("./controllers/topics.controllers.js");
const {
  getAllArticles,
  getArticleById,
  patchArticleById,
} = require("./controllers/articles.controllers.js");
const { getAllUsers } = require("./controllers/users.controllers.js");
const { handlePostgresErrors, handleCustomErrors, handleServerErrors } = require("./errors.js");
const {
  getArticleComments,
  postComment,
  deleteComment,
} = require("./controllers/comments.controllers.js");

app.use(cors());

app.use(express.json());

app.use("/", express.static("public"));

app.get("/api", getEndpoints);

app.get("/api/topics", getAllTopics);

app.get("/api/articles", getAllArticles);

app.get("/api/users", getAllUsers);

app.get("/api/articles/:article_id", getArticleById);

app.get("/api/articles/:article_id/comments", getArticleComments);

app.post("/api/articles/:article_id/comments", postComment);

app.patch("/api/articles/:article_id", patchArticleById);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handlePostgresErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
