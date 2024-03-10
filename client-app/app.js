import {program} from 'commander';
import mongoose from "mongoose";

const Token = mongoose.model('token', new mongoose.Schema({
    username: {type: String, require: true},
    token: {type: String, require: true}
}));

async function mongoConnect() {
    await mongoose.connect('mongodb://localhost:27017/webservice-coordination');
    console.log('[CLIENT APP] connected to mongo db');
}
async function runApplication() {
    await mongoConnect();
    const BACKEND_ENDPOINT = 'http://localhost:4000'

    program
        .command('register <username> <password>')
        .action(async (username, password) => {
            const registerUrl = `${BACKEND_ENDPOINT}/auth/register`;
            let response = await fetch(registerUrl, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });

            let {message, token} = await response.json();

            await Token.updateOne({username: username}, {$set: {token: token}}, {upsert: true});

            console.log(message);
        });
    program
        .command('login <username> <password>')
        .action(async (username, password) => {
            const loginUrl = `${BACKEND_ENDPOINT}/auth/login`;
            let response = await fetch(loginUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({username, password})
            });
            let {message, token} = await response.json();

            await Token.updateOne({username: username}, {$set: {token: token}}, {upsert: true});

            console.log(message);
        });
    program
        .command('send <your_username> <receiver_username> <text>')
        .action(async (your_username, receiver_username, text) => {
            const sessionToken = await Token.findOne({username: your_username});
            if (!sessionToken) {
                console.error(`[CLIENT APP] ${your_username} must be authenticated to send a message`);
                return;
            }
            const sendMessageUrl = `${BACKEND_ENDPOINT}/messages/send`;
            let response = await fetch(sendMessageUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken.token
                },
                body: JSON.stringify({username: your_username, receiver:receiver_username, text: text})
            });
            let data = await response.json();
            console.log(data);
        });
    program
        .command('receive <your_username>')
        .action(async (your_username) => {
            const sessionToken = await Token.findOne({username: your_username || 'random'});
            if (!sessionToken) {
                console.error(`[CLIENT APP] ${your_username} must be authenticated to receive a message`);
                return;
            }

            const receiveMessageUrl = `${BACKEND_ENDPOINT}/messages/receive/${your_username}`;
            let response = await fetch(receiveMessageUrl, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': sessionToken.token
                }
            });
            let data = await response.json();
            console.log(data);
        });
    program.parse(process.argv);

}

await runApplication();