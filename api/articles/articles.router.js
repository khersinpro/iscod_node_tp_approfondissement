const express = require('express');
const router = express.Router();
const articleController = require('./articles.controller');
const isAdmin = require('../../middlewares/isAdmin');
const authMiddleware = require('../../middlewares/auth');

router.post('/', authMiddleware, articleController.create);
router.put('/:id', authMiddleware, isAdmin, articleController.update);
router.delete('/:id', authMiddleware, isAdmin, articleController.delete);

module.exports = router;