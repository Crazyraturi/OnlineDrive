const express = require("express");
const userRouter = require("./routes/user.routes");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const app = express();
const indexRouter= require('./routes/index.routes')
const connectToDB = require("./config/db");
dotenv.config();
connectToDB();
app.use(cookieParser());

app.set("view engine", "ejs");

app.use("/user", userRouter);
app.use('/',indexRouter)

app.listen(3000, () => {
  console.log("server is running on port 3000");
});
