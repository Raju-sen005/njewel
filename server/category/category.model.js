const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const attributes = {
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    created: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated: { type: DataTypes.DATE },
  };

  const options = {
    timestamps: false,
  };

  return sequelize.define("Category", attributes, options); // <- Capital P here is good
};
