const express = require("express");
const { randomBytes } = require("crypto");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const posts = {};
const handleEvent = (type, data) => {
  if (type === "PostCreated") {
    const { id, title } = data;
    posts[id] = {
      id,
      title,
      comments: [],
    };
  }
  if (type === "CommentCreated") {
    const { id, content, postId, status } = data;
    const post = posts[postId];
    post.comments.push({ id, content, status });
  }
  if (type === "CommentUpdated") {
    console.log("status", status);
    const { id, content, postId, status } = data;

    const post = posts[postId];
    const comment = post.comments.find((co) => {
      return co.id === id;
    });

    comment.status = status;
    comment.content = content;
  }
};
app.get("/posts", (req, res) => {
  res.send(posts);
});
app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);

  console.log("Type", type);
  res.send({});
});

app.listen(5002, async () => {
  console.log("5002");
  const res = await axios.get("http://localhost:5005/events");
  for (let event of res.data) {
    console.log("Processing e", event.type);
    handleEvent(event.type, event.data);
  }
});
