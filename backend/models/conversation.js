const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const conversationSchema = new Schema({
    participants: [
        { type: Schema.Types.ObjectId, ref: "User" }
    ],
    isGroup: {
        type: Boolean,
        default: false
    },
    groupName: {
        type: String,
        default: null
    },
    groupIcon: {
        type: String,
        default: null
    },
    lastMessage: {
        type: Schema.Types.ObjectId, ref: "Message",
        default: null
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    
}, { timestamps: true });

module.exports = mongoose.model("Conversation", conversationSchema);