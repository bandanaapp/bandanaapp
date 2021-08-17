const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
const { Client } = require('pg');

//postgreSQL 接続(SSL)
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

//postgreSQL testquery
client.query('SELECT * FROM USERS;', (err, results) => {
  if (err) {
    console.log(err.stack);
  }else{
    console.log(results.rows[0]);
  }
  for (let row of results.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});


express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
  