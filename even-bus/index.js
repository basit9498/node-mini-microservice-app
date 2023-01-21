const express = require("express");
const bodyparser = require("body-parser");
const axios = require("axios");

const app = express();
app.use(bodyparser.json());

const events = [];
app.post("/events", (req, res) => {
  const event = req.body;
  events.push(event);
  axios.post("http://localhost:5000/events", event);
  axios.post("http://localhost:5001/events", event);
  axios.post("http://localhost:5002/events", event);
  axios.post("http://localhost:5003/events", event);
  res.send({
    status: "OK",
  });
});

app.get("/events", (req, res) => {
  res.send(events);
});
app.listen(5005, () => {
  console.log("5005 running");
});
