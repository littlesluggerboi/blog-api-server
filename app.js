import dotenv from "dotenv";
import express from "express";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.urlencoded({ extended: true }));

app.use(async (err, req, res, next) => {
  console.log(err);
  res.status(500).json({ error: err.message });
});


app.use(async (req, res, next) => {
    res.status(404).json("Not Found")
})

app.listen(PORT, ()=>{
    console.log(`Listening at port: ${PORT}`)
})
