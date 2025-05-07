// === backend/routes/userRoutes.js ===
const express = require('express');
const router = express.Router();
const { getUsers, deleteUser } = require('../controllers/userController');
const auth = require('../middleware/authMiddleware');

router.get('/', auth, getUsers);
router.delete('/:id', auth, deleteUser);

module.exports = router;