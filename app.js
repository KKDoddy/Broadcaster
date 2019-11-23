import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
    res.status(200).json({message: "welcome to BROADCASTER"});
});

app.listen(process.env.PORT, ()=>{
    console.log("Broadcaster server is running...");
});