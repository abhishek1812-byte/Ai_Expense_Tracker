import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import { initDB } from "./database/db";
import expenseRoutes from "./routes/expenses";

dotenv.config();

const app = express();


app.use(cors());
app.use(express.json());


app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});


app.use("/api/expenses", expenseRoutes);


initDB();


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
