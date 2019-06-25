const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.get("/users/:name", (req, res) => {
  const { name } = req.params;

  return res.json({
    message: `Hello my friend ${name}`
  });
});

app.post("/users/", (req, res) => {
  const { username } = req.body;

  return res.json({
    send: `You send this body: ${username}`
  });
});

app.listen(3333);
