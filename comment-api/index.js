const express = require("express");
const { randomBytes } = require("crypto");
const bodyparser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();

app.use(bodyparser.json());
app.use(cors());
const commentsByPost = {};
app.get("/post/:id/comments", (req, res) => {
  res.send(commentsByPost[req.params.id] || []);
});

app.post("/post/:id/comments", async (req, res) => {
  const commentid = randomBytes(4).toString("hex");
  const { content } = req.body;
  const comments = commentsByPost[req.params.id] || [];
  comments.push({ id: commentid, content, status: "pending" });
  commentsByPost[req.params.id] = comments;
  await axios.post("http://localhost:5005/events", {
    type: "CommentCreated",
    data: {
      id: commentid,
      content,
      postId: req.params.id,
      status: "pending",
    },
  });
  res.status(201).send(comments);
});
app.post("/events", async (req, res) => {
  console.log("Received Event:", req.body.type);
  const { type, data } = req.body;
  if (type === "CommentModerted") {
    const { postId, id, status, content } = data;
    const comments = [postId];
    const comment = comments.find((co) => {
      return co.id === id;
    });

    comment.status = status;
    await axios("http://localhost:5005/events", {
      type: "CommentUpdated",
      data: {
        id,
        status,
        postId,
        content,
      },
    });
  }
  res.send({});
});
app.listen(5001, () => {
  console.log("comments api 5001");
});
