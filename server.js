import express from "express";
import jwt from "jsonwebtoken";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import authRoutes from "./routes/authRoutes.js";

const app = express();

const checkToken = (req, res, next) => {
  const token = req.headers["authorization"];
  //Aqui faz a verificação do token com o jwt.verify
  if (token) {
    jwt.verify(token, "xingling", (err, decoded) => {
      if (err) {
        return res.status(401).json({ message: "token invalido !" });
      }
    });
  } else {
    return res.status(404).json({ message: "cadê o token magrão?" });
  }
};

app.use(express.json());

// app.use("/api", checkToken, userRoutes);
app.use("/api", userRoutes);
app.use("/api", productRoutes);
app.use("/api", authRoutes);

app.listen(6000, () => {
  console.log("Servidor Rodando");
});
