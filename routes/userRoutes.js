const express = require('express');
const router = express.Router();
const {loginUser, registerUser, getDogs} = require('../controllers/userController');

const {protect} = require('../middleware/authMiddleware');

router.post('/', registerUser)

router.post('/login', loginUser)

router.get('/dogs', protect, getDogs )

module.exports = router