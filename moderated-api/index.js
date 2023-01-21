const express = require("express");

const bodyparser = require("body-parser");

const axios = require("axios");

const app = express();

app.use(bodyparser.json());

app.post("/events", async (req, res) => {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:5002/events", {
      type: "CommentModerted",
      data: {
        id: data.id,
        postId: data.postId,
        status,
        content: data.content,
      },
    });
  }
  res.send({});
});

app.listen(5003, () => {
  console.log("5003 modrate");
});
