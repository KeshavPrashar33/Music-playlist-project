const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const playlistsCtrl = require('../controllers/playlistsController');

router.get('/', auth, playlistsCtrl.getUserPlaylists);
router.post('/', auth, playlistsCtrl.createPlaylist);
router.put('/:id', auth, playlistsCtrl.updatePlaylist);
router.patch('/:id/add-song/:songId', auth, playlistsCtrl.addSong);
router.delete('/:id', auth, playlistsCtrl.deletePlaylist);

module.exports = router;
