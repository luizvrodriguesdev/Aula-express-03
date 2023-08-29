import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config
mongoose.connect(
  "mongodb+srv://admin:admin123@cluster0.hanx8fr.mongodb.net/app_test"
);

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// const newUser = new User({
//   name: "Didi",
//   email: "didi@didi.com",
//   age: 41,
// });

async function saveUser() {
  const newUser = new User({
    name: "Didi",
    email: "didi@didi.com",
    age: 41,
  });
  try {
    await newUser.save();
    console.log("Usuário inserido com sucesso!");
  } catch (err) {
    console.log("Ocorreu um erro", err);
  } finally {
    mongoose.connection.close();
  }
}

saveUser();

// newUser.save((err) => {
//   if (err) {
//     console.log("DEU PAU GERAL", err);
//   } else {
//     console.log("DEU BOA GALERA!");
//   }
//   mongoose.connection.close();
// });
