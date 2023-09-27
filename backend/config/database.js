const mongoose = require("mongoose");
const dotenv = require("dotenv");

//config
dotenv.config({ path: "./config.env" });

const connectDb = () => {
  const db_link = `mongodb+srv://prasukj02:${process.env.DB_PASSWORD}@cluster0.qqtwjzy.mongodb.net/`;
  mongoose
    .connect(db_link)
    .then(() => {
      console.log("Database connected successfully");
    })
};


module.exports = connectDb;
