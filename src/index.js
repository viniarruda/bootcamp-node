const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

// Query params ?name=Vinicius
// Route params /user/1
// Request body

let users = [
  {
    name: "Vinicius",
    lastName: "Arruda"
  },
  {
    name: "Danilo",
    lastName: "Lima"
  }
];

const transformToLowercase = value => {
  return value.toLowerCase();
};

app.get("/users/:name", (req, res) => {
  const { name } = req.params;

  const result = users.find(
    u => transformToLowercase(u.name) === transformToLowercase(name)
  );

  return res.json({
    result: result
  });
});

app.get("/users", (req, res) => {
  return res.json({
    users
  });
});

app.post("/users/", (req, res) => {
  const { name, lastName } = req.body;

  users = [...users, { name, lastName }];

  return res.json({
    users: users
  });
});

app.put("/users/:name", (req, res) => {
  const { name: firstName, lastName } = req.body;
  const { name } = req.params;

  users.map(u => {
    if (transformToLowercase(u.name) === transformToLowercase(name)) {
      u.name = firstName;
      u.lastName = lastName;
    }
  });

  return res.json({
    att: users
  });
});

app.delete("/users/:name", (req, res) => {
  const { name } = req.params;

  let index;

  users.map(u => {
    if (transformToLowercase(u.name) === transformToLowercase(name)) {
      index = users.indexOf(u);
      if (index > -1) {
        users.splice(index, 1);
      }
    }
  });

  return res.json({
    users: users
  });
});

app.listen(3333);
