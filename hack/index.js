import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./dbconfig/index.js";
import helmet from "helmet";
import router from "./routes/index.js";
import History from "./models/history.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

connectDB();

// Middleware
app.use(helmet());
// app.use(
//   cors()
//   //   cors({
//   //     origin: "http://localhost:3000",
//   //     methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   //   })
// );
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/:id/history/save", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    data.userId = id;

    const history = new History(data);

    await history.save();
    res.status(200).json({ message: "Data saved successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "An error occurred while saving data" });
  }
});

// Routes
app.use(router);

app.listen(PORT, () => {
  console.log(`Connected to PORT ${PORT}`);
});
