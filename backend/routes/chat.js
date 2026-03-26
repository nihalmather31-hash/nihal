const express = require('express');
const router = express.Router();
const Message = require('../models/Message');
const User = require('../models/User');
const { protect } = require('../middleware/auth');

// @route   POST /api/chat/send
// @desc    Send a message
// @access  Private
router.post('/send', protect, async (req, res) => {
    try {
        const { receiverId, content } = req.body;
        const senderId = req.user._id;

        const message = new Message({
            sender: senderId,
            receiver: receiverId,
            content
        });

        await message.save();
        res.status(201).json({ success: true, message });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/chat/messages/:otherUserId
// @desc    Get messages between two users
// @access  Private
router.get('/messages/:otherUserId', protect, async (req, res) => {
    try {
        const myId = req.user._id;
        const otherId = req.params.otherUserId;

        const messages = await Message.find({
            $or: [
                { sender: myId, receiver: otherId },
                { sender: otherId, receiver: myId }
            ]
        }).sort({ timestamp: 1 });

        // Mark as read
        await Message.updateMany(
            { sender: otherId, receiver: myId, isRead: false },
            { isRead: true }
        );

        res.json({ success: true, messages });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// @route   GET /api/chat/conversations
// @desc    Get all conversations (for admin)
// @access  Private
router.get('/conversations', protect, async (req, res) => {
    try {
        const myId = req.user._id;

        // Find distinct users I have messaged or who messaged me
        const messages = await Message.find({
            $or: [{ sender: myId }, { receiver: myId }]
        }).sort({ timestamp: -1 });

        const usersSet = new Set();
        const threads = [];

        for (const msg of messages) {
            const otherId = msg.sender.toString() === myId.toString() ? msg.receiver.toString() : msg.sender.toString();
            if (!usersSet.has(otherId)) {
                usersSet.add(otherId);
                const otherUser = await User.findById(otherId).select('username role lastLogin');
                if (otherUser) {
                    threads.push({
                        user: otherUser,
                        lastMessage: msg
                    });
                }
            }
        }

        res.json({ success: true, conversations: threads });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

module.exports = router;
