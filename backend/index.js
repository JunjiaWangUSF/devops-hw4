import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createPool({
  connectionLimit: 10,
  host: "db",
  user: "root",
  password: "yourpassword",
  database: "test",
});

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.json("Hello World from the backend!!!");
});

app.get("/books", (req, res) => {
  const query = "SELECT * FROM books";
  db.query(query, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const query =
    "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?, ?, ?, ?)";
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created successfully!!!");
  });
});

app.delete("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const query = "DELETE FROM books WHERE id = ?";

  db.query(query, [bookID], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been deleted successfully!!!");
  });
});

app.put("/books/:id", (req, res) => {
  const bookID = req.params.id;
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
    bookID,
  ];
  const query =
    "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  db.query(query, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been updated successfully!!!");
  });
});

app.listen(3001, () => {
  console.log("Connected to the backend!!!!");
});
