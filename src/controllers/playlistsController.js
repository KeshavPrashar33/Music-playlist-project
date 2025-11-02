const { Playlist, Song } = require('../models');

exports.getUserPlaylists = async (req, res, next) => {
  try {
    const playlists = await Playlist.findAll({
      where: { userId: req.userId },
      include: [{ model: Song, through: { attributes: [] } }]
    });
    res.json({ playlists });
  } catch (e) { next(e); }
};

exports.createPlaylist = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    if (!name) return res.status(400).json({ error: 'Playlist name required' });
    const playlist = await Playlist.create({ name, description, userId: req.userId });
    res.status(201).json({ playlist });
  } catch (e) { next(e); }
};

exports.updatePlaylist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const playlist = await Playlist.findOne({ where: { id, userId: req.userId } });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    await playlist.update(req.body);
    res.json({ message: 'Playlist updated' });
  } catch (e) { next(e); }
};

exports.addSong = async (req, res, next) => {
  try {
    const { id, songId } = { id: req.params.id, songId: req.params.songId };
    const playlist = await Playlist.findOne({ where: { id, userId: req.userId } });
    if (!playlist) return res.status(404).json({ error: 'Playlist not found' });
    const song = await Song.findByPk(songId);
    if (!song) return res.status(404).json({ error: 'Song not found' });
    await playlist.addSong(song);
    res.json({ message: 'Song added to playlist' });
  } catch (e) { next(e); }
};

exports.deletePlaylist = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Playlist.destroy({ where: { id, userId: req.userId } });
    if (!deleted) return res.status(404).json({ error: 'Playlist not found' });
    res.json({ message: 'Playlist deleted' });
  } catch (e) { next(e); }
};
