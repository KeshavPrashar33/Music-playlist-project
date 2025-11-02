const { Sequelize } = require('sequelize');
const UserModel = require('./user');
const SongModel = require('./song');
const PlaylistModel = require('./playlist');

const sequelize = new Sequelize(
  process.env.DB_NAME || 'music_playlist_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    port: process.env.DB_PORT || 3306,
    logging: false
  }
);

const User = UserModel(sequelize);
const Song = SongModel(sequelize);
const Playlist = PlaylistModel(sequelize);

User.hasMany(Playlist, { foreignKey: 'userId', onDelete: 'CASCADE' });
Playlist.belongsTo(User, { foreignKey: 'userId' });

Playlist.belongsToMany(Song, { through: 'PlaylistSongs', foreignKey: 'playlistId' });
Song.belongsToMany(Playlist, { through: 'PlaylistSongs', foreignKey: 'songId' });

module.exports = { sequelize, User, Song, Playlist };
