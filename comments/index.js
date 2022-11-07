const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const { randomBytes } = require("crypto");
const { appendFile } = require("fs");

const commentsByPostId = {};

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/posts/:id/comments", (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const commentId = randomBytes(4).toString("hex"); // make random id number
  const { content } = req.body; // return all input from the content

  const comments =
    commentsByPostId[req.params.id] /** it should undefined **/ || []; // the empty array should return if undifined

  comments.push({ id: commentId, content: content });
  commentsByPostId[req.params.id] = comments;
  res.status(200).send(comments);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
