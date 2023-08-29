import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
const router = express.Router();

const users = [
  {
    id: 1,
    username: "usuario1",
    password: "$2b$10$Qq3sXncZwLHf.LDQbLSjY.BnebRw18djg4DXOoBvxuaBHn7Q0yoNC",
  },
  {
    id: 2,
    username: "usuario2",
    password: "$2b$10$V5NijOgXZeaYcyFl7Li8seGnbTBlSuj8h3b/.AmIcH6tAfRlKdyfG",
  },
];

const AuthController = {
  login: (req, res) => {
    const password = "123";
    const saltRounds = 0;

    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    console.log(hashedPassword);
    const user = users.find((user) => user.username === req.body.username);
    if (!user) {
      return res.status(401).send("Credenciais inválidas!");
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(401).send("Credenciais inválidas!");
    } else {
      const secretKey = "meuQueridoApp";
      const token = jwt.sign(
        { userId: user.id, permission: "admin" },
        secretKey,
        {
          expiresIn: "1h",
        }
      );
      return res.status(200).send({ message: "Usuário Encontrato!", token });
    }
    // if (user.password === req.body.password) {
    //   const secretKey = "meuQueridoApp";
    //   const token = jwt.sign(
    //     { userId: user.id, permission: "admin" },
    //     secretKey,
    //     {
    //       expiresIn: "1h",
    //     }
    //   );
    //   return res.status(200).send({ message: "Usuário Encontrato!", token });
    // } else {
    //   return res.status(401).send("Credenciais inválidas!");
    // }
  },
};

export default AuthController;
