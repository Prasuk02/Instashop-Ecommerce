const app = require("./app");
const dotenv = require("dotenv");
const mongoDb = require("./config/database");

// handling uncaught exception
process.on("uncaughtException", (error) => {
  console.log("Error: ", error.message);
  console.log("Shutting down the server due to uncaught exception");
  process.exit(1);
});

//config
dotenv.config({ path: "backend/config/config.env" });
mongoDb();

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
