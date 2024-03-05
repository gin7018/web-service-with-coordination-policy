import {verifyAuthentication} from "../middleware/verifyAuthentication.js";
import {Message} from "../model/model.js";
import express from "express";

export const messagingRouter = express.Router();

messagingRouter.get('/receive', verifyAuthentication, async (req, res) => {
    try {
        const {username} = req.body;
        const messagesSentToUser = await Message
            .findOne({receiver: username})
            .sort({timestamp: "desc"});

        const responsePayload = {
            message: messagesSentToUser.text,
            sender: messagesSentToUser.sender
        }
        res.status(200).json({...responsePayload});
        console.log(`[MESSAGE SERVICE] received messages; username=${username}`);
    } catch (e) {
        console.error(`[MESSAGE SERVICE] error=${e.message}`);
        res.status(400).json({error: `error receiving messages; error=${e.message}`});
    }
});

messagingRouter.post('/send', verifyAuthentication, async (req, res) => {
    try {
        const {username, receiver, text} = req.body;

        const message = new Message({sender:username, receiver, text});
        await message.save();
        console.log(`[MESSAGE SERVICE] message sent successfully; sender=${username}; receiver=${receiver}`);
        res.status(200).json({message: `message sent successfully; sender=${username}; receiver=${receiver}`});
    } catch (e) {
        console.error(`[MESSAGE SERVICE] error=${e.message}`);
        res.status(400).json({error: `error sending message; error=${e.message}`});
    }
});
