const express = require("express");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const commentsByPostId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.send(commentsByPostId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const commentId = randomBytes(4).toString("hex");
  const postId = req.params.id;
  const comments = commentsByPostId[postId] || [];

  comments.push({ id: commentId, content, status: "pending" });
  commentsByPostId[postId] = comments;
  await axios.post("http://localhost:4500/events", {
    type: "CommentCreated",
    data: { postId, id: commentId, content, status: "pending" },
  });

  res.status(201).send(comments);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const { postId, id, ...rest } = data;
    const comments = commentsByPostId[postId];
    let comment = comments.find((comment) => comment.id === id);
    comment = { postId, ...comment, ...rest };

    console.log("comment updated -----", comment);

    await axios.post("http://localhost:4500/events", {
      type: "CommentUpdated",
      data: comment,
    });
  }
  res.send({});
});

app.listen(4100, () => {
  console.log("Listening on port 4100");
});
