const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

const events = [];

app.post("/events", (req, res) => {
  const event = req.body;

  events.push(event);

  axios.post("http://posts-clusterip-srv:4000/events", event);
  axios.post("http://comments-clusterip-srv:4100/events", event);
  axios.post("http://query-clusterip-srv:4200/events", event);
  axios.post("http://moderation-clusterip-srv:4300/events", event);

  res.send({ status: "OK" });
});

app.get("/events", (req, res) => {
  res.send(events);
});

app.listen(4500, () => {
  console.log("Listening on port 4500");
});
