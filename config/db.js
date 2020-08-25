const mongoose = require('mongoose')
const config = require("./default");

const dbConnection = () => {
  const db = mongoose.connection;

  mongoose.connect(config.db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.set("useCreateIndex", true);
  db.on("error", console.error.bind(console, "connection error:"));
  db.once("open", () => console.log("Connection to Database successful....."));
};

module.exports = dbConnection;
