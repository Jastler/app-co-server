
//db.serialize
const sqlite3 = require('sqlite3').verbose();
const users = require('./api/users.json');
const users_statistic = require('./api/users_statistic.json');

const DBSOURCE = "users.sqlite"

const db = new sqlite3.Database(DBSOURCE, (err) => {
  if (err) {
    console.error(err.message)
  } else {
      db.run(`CREATE TABLE users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER,
          first_name TEXT,
          last_name TEXT,
          email TEXT, 
          gender TEXT,
          ip_address TEXT, 
          CONSTRAINT email_unique UNIQUE (email)
          )`,
      (err) => {
          if (err) {
              console.log(err.message)
          }else{
            // Table just created, creating some rows
            for (const user of users) {
              const insert = `INSERT INTO users (user_id,first_name,last_name, email,gender,ip_address) VALUES (?,?,?,?,?,?)`;
              //db.run(insert)
              db.run(insert, [user.id,user.first_name,user.last_name,user.email,user.gender,user.ip_address])
            }
            
          }
      });
      db.run(`CREATE TABLE users_statistic (
          user_id INTEGER,
          date TEXT,
          page_views INTEGER, 
          clicks INTEGER
          )`,
      (err) => {
          if (err) {
              console.log(err.message)
          } else {
            for (const user_stat of users_statistic) {
              const insert = `INSERT INTO users_statistic ( user_id,date, page_views,clicks) VALUES (?,?,?,?)`;
              db.run(insert, [user_stat.user_id,user_stat.date,user_stat.page_views,user_stat.clicks])
            }
          }
      });  
  }
});

db.close((err) => {
  if (err) {
      return console.error(err.message);
  }
  console.log('Close the database connection.');
});

module.exports = db
