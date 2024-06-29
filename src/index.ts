import express from "express";
import 'dotenv/config';
import cors from "cors";

import apiRouter from "./api";

const app = express();

app.use(cors());
app.use(express.json());

const PORT = process.env.PORT;

app.use("/api", apiRouter);

app.listen(PORT, () => {
    console.log("Main server running on port : " + PORT);
})