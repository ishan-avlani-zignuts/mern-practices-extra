require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const authRoutes = require("./routes/auth");

connection();

app.use(express.json()); // Add this line to parse JSON bodies
app.use(express.urlencoded({ extended: true })); 
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.use(express.json());

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`listening on port ${port}...`));
