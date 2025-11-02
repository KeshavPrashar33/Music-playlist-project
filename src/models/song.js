const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Song', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: { type: DataTypes.STRING, allowNull: false },
    artist: { type: DataTypes.STRING, allowNull: false },
    album: { type: DataTypes.STRING },
    genre: { type: DataTypes.STRING },
    durationSeconds: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, { timestamps: false });
};
