const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const posts = {};

app.get("/posts", (_req, res) => {
  res.send(posts);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;

  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = { id: id, title: title, comments: [] };
  }

  if (type === "CommentCreated") {
    const { postId, id, content } = data;
    posts[postId].comments.push({
      id: id,
      content: content,
    });
  }

  res.send({ status: "OK" });
});

app.listen(4200, () => {
  console.log("Listening on port 4200");
});
