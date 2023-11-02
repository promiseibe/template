const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRoute = require("./routes/userRoute");
const errorHandler = require("./middleware/errorMiddle");
const productRoute = require("./routes/productRoute");

mongoose.set("strictQuery", false);
const app = express();

// Middlewares
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute)


app.use(errorHandler);
const PORT = process.env.PORT || 5001;
mongoose.connect("mongodb://127.0.0.1:27017/Maibe_Stores");

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
});
