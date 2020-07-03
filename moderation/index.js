const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const { postId, id, content } = data;
    const status = content.includes("orange") ? "rejected" : "approved";
    console.log(status);

    await axios.post("http://event-bus-srv:4500/events", {
      type: "CommentModerated",
      data: {
        postId,
        id,
        content,
        status,
      },
    });
  }

  res.send({ status: "OK" });
});

app.listen(4300, () => {
  console.log("Listening on port 4300");
});
