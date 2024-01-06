const mongoose = require("mongoose");

exports.connectDb = async () => {
  try {
    await mongoose.set("strictQuery", false);
    await mongoose.connect(process.env.DB_URI, { useNewUrlParser: true });
    console.log("Database is connected.....");
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};
