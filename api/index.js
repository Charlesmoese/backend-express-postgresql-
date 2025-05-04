import express from "express";
import dotenv from "dotenv";
import { connect } from "./database/configdb.js";
import userRoutes from "./routes/user.route.js";
import tokenRoutes from "./routes/token.route.js";

dotenv.config();

// Conectar ao banco de dados e garantir que a tabela seja criada
connect();

const app = express();

app.use(express.json());
app.use("/users", userRoutes);
app.use("/", tokenRoutes);
app.get("/", (req, res) => res.send("Express on Vercel"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server running at http://localhost:${process.env.PORT || 3000}`);
});