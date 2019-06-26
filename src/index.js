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

// Specific middleware
const checkNameExists = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ error: "Name is required" });
  }
  return next();
};

const checkUserExist = (req, res, next) => {
  const { name } = req.params;

  if (
    !users.some(
      s => transformToLowercase(s.name) === transformToLowercase(name)
    )
  ) {
    return res.status(400).json({ error: "User does not exist" });
  }
  // manipulate req
  // req.user = { name: 'New', lastName: 'Person'}
  return next();
};

// Middleware Global
app.use((req, res, next) => {
  console.time("Request");

  console.log(`Method: ${req.method}; URL: ${req.url};`);

  next();

  console.timeEnd("Request");
});

app.get("/users/:name", checkUserExist, (req, res) => {
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

app.post("/users/", checkNameExists, (req, res) => {
  const { name, lastName } = req.body;

  users = [...users, { name, lastName }];

  return res.json({
    users: users
  });
});

app.put("/users/:name", checkUserExist, checkNameExists, (req, res) => {
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

app.delete("/users/:name", checkUserExist, (req, res) => {
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
