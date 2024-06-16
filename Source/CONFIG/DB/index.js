const mongoose = require("mongoose");

async function connect1() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Be_Yourself", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Successfully!!!");
  } catch (err) {
    console.log("Connect Failed!!!");
  }
}

async function connect2() {
  try {
    await mongoose.connect("mongodb://localhost:27017/Be_Yourself", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connect Successfully!!!");
  } catch (err) {
    console.log("Connect Failed!!!");
  }
}

module.exports = { connect1, connect2 };
