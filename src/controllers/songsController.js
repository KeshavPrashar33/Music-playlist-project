const { Song } = require('../models');

exports.list = async (req, res, next) => {
  try {
    const songs = await Song.findAll();
    res.json({ songs });
  } catch (e) { next(e); }
};

exports.create = async (req, res, next) => {
  try {
    const { title, artist, album, genre, durationSeconds } = req.body;
    if (!title || !artist) return res.status(400).json({ error: 'title and artist are required' });
    const song = await Song.create({ title, artist, album, genre, durationSeconds });
    res.status(201).json({ song });
  } catch (e) { next(e); }
};

exports.update = async (req, res, next) => {
  try {
    const id = req.params.id;
    const [changed] = await Song.update(req.body, { where: { id } });
    if (!changed) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song updated' });
  } catch (e) { next(e); }
};

exports.delete = async (req, res, next) => {
  try {
    const id = req.params.id;
    const deleted = await Song.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ error: 'Song not found' });
    res.json({ message: 'Song deleted' });
  } catch (e) { next(e); }
};
