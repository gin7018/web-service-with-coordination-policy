import mongoose from 'mongoose';

export const User = mongoose.model('user', new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    password: {type: String, unique: false, required: true}
}));

export const Message = mongoose.model('message', new mongoose.Schema({
    sender: {type: String, required: true},
    receiver: {type: String, required: true},
    text: {type: String, required: true},
    timestamp: {type: Date, require: true, default: Date.now()}
}));