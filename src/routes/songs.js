const express = require('express');
const router = express.Router();
const songsCtrl = require('../controllers/songsController');

router.get('/', songsCtrl.list);
router.post('/', songsCtrl.create);
router.put('/:id', songsCtrl.update);
router.delete('/:id', songsCtrl.delete);

module.exports = router;
