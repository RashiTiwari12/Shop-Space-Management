const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const db = require("./database");

const app = express();
const port = 3003;

app.use(express.static(path.join(__dirname, "build")));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.get("/api/spaces", (req, res) => {
  db.all("SELECT * FROM spaces", [], (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      console.log(res);
    } else {
      res.json(rows);
    }
  });
});
app.post("/api/spaces", (req, res) => {
  const { name, type, capacity, occupied, price_per_unit } = req.body;

  const sql = `INSERT INTO spaces (name, type, capacity, occupied, price_per_unit, created_at) VALUES (?, ?, ?, ?, ?, CURRENT_TIMESTAMP)`;
  const params = [name, type, capacity, occupied, price_per_unit];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res
        .status(201)
        .json({ id: this.lastID, message: "Space created successfully" });
    }
  });
});
app.put("/api/spaces/:id", (req, res) => {
  const { name, type, capacity, occupied, price_per_unit } = req.body;
  const { id } = req.params;

  const sql = `
    UPDATE spaces 
    SET name = ?, type = ?, capacity = ?, occupied = ?, price_per_unit = ?, created_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;

  const params = [name, type, capacity, occupied, price_per_unit, id];

  db.run(sql, params, function (err) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.status(200).json({ id: id, message: "Space updated successfully" });
    }
  });
});

app.delete("/api/spaces/:id", (req, res) => {
  const { id } = req.params;

  const query = "DELETE FROM spaces WHERE id = ?";

  db.run(query, [id], (err) => {
    if (err) {
      res.status(500).send("Error deleting the record.");
    } else {
      res.send("Record deleted successfully.");
    }
  });
});
app.listen(port, () => console.log(`Listening on port ${port}.`));
