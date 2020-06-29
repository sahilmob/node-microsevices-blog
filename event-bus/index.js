const express = require("express");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/events", (req, res) => {
  const event = req.body;
  axios.post("http://localhost:4000/events", event);
  axios.post("http://localhost:4100/events", event);
  axios.post("http://localhost:4200/events", event);

  res.send({ status: "OK" });
});

app.listen(4500, () => {
  console.log("Listening on port 4500");
});
