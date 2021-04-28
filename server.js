const express = require("express");
const sqlite3 = require('sqlite3').verbose();
var cors = require('cors');
const app = express();

const HTTP_PORT =  process.env.PORT || 8000;

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
});

let db = new sqlite3.Database('./users.db', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
      console.error(err.message);
  }
  console.log('Connected to the test database.');
});

app.use(cors());
app.options('*', cors());

app.get("/api/users", (req, res) => {
  const sql = `
    SELECT
      u.user_id,
      SUM(us.clicks) as total_clicks,
      SUM(us.page_views) as total_page_views,
      u.first_name,
      u.last_name,
      u.email,
      u.gender,
      u.ip_address
    FROM users_statistic us JOIN users u
    ON us.user_id = u.user_id
    GROUP BY us.user_id
    LIMIT ${req.query.limit} OFFSET ${(req.query.page - 1) * req.query.limit}
  `;
  db.all(sql, [], (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
        "message":"success",
        "data":rows
      })
    });
});

app.get("/api/info", (req, res) => {
  const sql = `SELECT
    u.user_id,
    u.first_name,
    u.last_name,
    us.date,
    us.page_views,
    us.clicks
  FROM users_statistic us JOIN users u
  ON us.user_id = u.user_id
  WHERE u.user_id = ${req.query.user}`;
  const params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.get("/api/pages", (req, res) => {
  const sql = "SELECT COUNT(*) as count FROM users"
  const params = []
  db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({"error":err.message});
        return;
      }
      res.json({
          "message":"success",
          "data":rows
      })
    });
});

app.get("/", (req, res) => {
    res.json({"message":"Ok"})
});

app.use(function(req, res){
    res.status(404);
});
