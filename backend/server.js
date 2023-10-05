const app = require("./app");
const dotenv = require("dotenv");
const mongoDb = require("./config/database");
const cloudinary = require("cloudinary")

// handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log("Error: ", error.message);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });
mongoDb();
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_SECRET
});

const server = app.listen(process.env.PORT, () => {
  console.log(`Server started on http://localhost:${process.env.PORT}`);
});

//unhandled promise rejection
process.on("unhandledRejection", (error) => {
  console.log("Error: ", error.message);
  console.log("Shutting down the server due to unhandled promise rejection");

  server.close(() => {
    process.exit(1);
  });
});
