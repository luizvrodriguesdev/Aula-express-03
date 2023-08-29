import express from "express";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

app.use(express.json());

app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.listen(6000, () => {
  console.log("Servidor Rodando");
});
