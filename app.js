import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/authRoutes.js";
import "./configs/passportConfig.js";
import postRoutes from "./routes/postRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use("/", authRoutes);
app.use("/posts", postRoutes);
app.use("/comments", commentRoutes);

app.use(async (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});

app.use(async (req, res, next) => {
  res.status(404).send("Not Found");
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
