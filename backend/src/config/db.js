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

// import dotenv from "dotenv";
// dotenv.config();
// import mysql from "mysql2/promise";

// const pool = mysql.createPool({
//   host: process.env.MYSQL_HOST,
//   port: process.env.MYSQL_PORT,
//   user: process.env.MYSQL_USER,
//   password: process.env.MYSQL_PASSWORD,
//   database: process.env.MYSQL_DATABASE,
//   waitForConnections: true,
//   connectionLimit: 10,
// });

// export default pool;
import dotenv from "dotenv";
dotenv.config();

import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: process.env.MYSQLHOST,
  port: process.env.MYSQLPORT,
  user: process.env.MYSQLUSER,
  password: process.env.MYSQLPASSWORD,
  database: process.env.MYSQLDATABASE,
  waitForConnections: true,
  connectionLimit: 10,
  ssl: {
    rejectUnauthorized: false
  }
});

export default pool;
pool.getConnection()
  .then(() => console.log("✅ Railway MySQL connected"))
  .catch(err => console.error("❌ Railway MySQL error:", err));

