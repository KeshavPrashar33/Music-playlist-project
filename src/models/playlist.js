const { DataTypes } = require('sequelize');
module.exports = (sequelize) => {
  return sequelize.define('Playlist', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.STRING },
    createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
  }, { timestamps: false });
};
