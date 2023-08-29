import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
dotenv.config();
mongoose.connect(process.env.URI_MONGO);
// mongoose.connection.dropCollection("users");

const userSchema = new mongoose.Schema({
  name: { type: String, index: true },
  email: { type: String, unique: true },
  username: { type: String, unique: true },
  age: Number,
  password: String,
});

const User = mongoose.model("User", userSchema);

// User.init();

const UserController = {
  createUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const SALT_ROUNDS = 10;
    const hashPassword = await bcrypt.hash(req.body.password, SALT_ROUNDS);
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      age: req.body.age,
      username: req.body.username,
      password: hashPassword,
    });
    try {
      await newUser.save();
      console.log("Usuário inserido com sucesso!");
      res.status(201).send("createUser");
    } catch (err) {
      console.log("Ocorreu um erro:", Object.keys(err.keyValue)[0]);
      if (Object.keys(err.keyValue)[0] === "username") {
        res.status(409).send("Username já cadastrado!");
      } else if (Object.keys(err.keyValue)[0] === "email") {
        res.status(409).send("Email já cadastrado!");
      }
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },
  updateUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    // const userId = req.params.id;
    const userId = req.body.idToBeMofified;
    const updateData = req.body.user;
    try {
      const updatedUser = await User.updateOne({ _id: userId }, updateData);
      if (updatedUser.nModified === 0) {
        res.status(404).send("Nenhum usuário encontrado no banco!");
      } else {
        res.status(200).json({ message: "Usuário Atualizado!" });
      }
    } catch (error) {
      console.log("Ocorreu um erro", error);
      res.status(500).send(error);
    }
  },
  deleteUser: async (req, res) => {
    const userId = req.params.id;
    console.log(userId);
    try {
      const deletedUser = await User.deleteOne({
        _id: userId,
      });
      if (deletedUser.deletedCount === 0) {
        res.status(404).send("Nenhum usuário encontrado no banco!");
      } else {
        res.status(204).send();
      }
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
  },
  getUser: async (req, res) => {
    console.log("ENTREI AQUI!");
    const userId = req.params.id;
    try {
      const user = await User.findById(userId);
      if (user) {
        res.status(200).send(user);
      } else {
        res.status(404).send("Nenhum usuário encontrado no banco!");
      }
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

export default UserController;
