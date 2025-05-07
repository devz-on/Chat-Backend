// === backend/routes/messageRoutes.js ===
const express = require('express');
const router = express.Router();
const { getMessages, deleteMessage } = require('../controllers/messageController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getMessages);
router.delete('/:id', auth, deleteMessage);

module.exports = router;