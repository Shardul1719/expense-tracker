// import dotenv from "dotenv";
// dotenv.config();

// import mysql from "mysql2/promise";

// console.log("DB USER 👉", process.env.DB_USER);

// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export default pool;

import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";
console.log("MYSQL_HOST:", process.env.MYSQL_HOST);
console.log("MYSQL_PORT:", process.env.MYSQL_PORT);
console.log("MYSQL_USER:", process.env.MYSQL_USER);
console.log("MYSQL_DATABASE:", process.env.MYSQL_DATABASE);

const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 10,
});

export default pool;


