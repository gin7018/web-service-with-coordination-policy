import {User} from "../model/model.js";
import jwt from "jsonwebtoken";
import express from "express";

export const authRouter = express.Router();

authRouter.put('/register', async (req, res) => {
    try {
        const {username, password} = req.body;
        const newUser = new User({username, password});
        await newUser.save();

        const secretKey = 'super_secret_key';
        const token = jwt.sign(newUser.toJSON(), secretKey)

        console.log(`[AUTH SERVICE] user registration successful. session token generated; user=${username}`);
        res.status(201).json({token: token, message: `user registered successful; user=${username}`});
    } catch (e) {
        console.error(`[AUTH SERVICE] user registration failed; error=${e.message}`);
        res.status(500).json({error: 'user registration failed'});
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const {username, password} = req.body;
        const existingUser = await User.findOne({username: username});
        if (!existingUser || existingUser.password !== password) {
            res.status(404).json({error: `user login failed;`});
            return;
        }
        const secretKey = 'super_secret_key';
        const token = jwt.sign(existingUser.toJSON(), secretKey)
        res.status(200).json({token: token, message: `log in successful; user=${existingUser.username}`});
    } catch (e) {
        console.error(`[AUTH SERVICE] user login failed; error=${e.message}`);
        res.status(404).json({error: `user login failed; error=${e.message}`});
    }
});
