import express from 'express';
import mongoose from "mongoose";
import {authRouter} from "./src/routes/auth.js";
import {messagingRouter} from "./src/routes/messaging.js";

const PORT = process.env["PORT"] || 4000;
export const app = express();

app.use(express.json());
app.use('/auth', authRouter);
app.use('/messages', messagingRouter);


async function mongoConnect() {
    await mongoose.connect('mongodb://localhost:27017/webservice-coordination');
    console.log('[WEB SERVICE] connected to mongo db');
}

await mongoConnect();

app.get('/', (req, res) => {
    res.status(200).json({message: 'request received'});
})

app.listen(PORT, () => {
    console.log(`[WEB SERVICE] started, listening on port ${PORT}`);
})

