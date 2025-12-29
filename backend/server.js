import dotenv from "dotenv";
dotenv.config();

console.log("ENV CHECK 👉", process.env.DB_USER);

import app from "./src/app.js";
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
