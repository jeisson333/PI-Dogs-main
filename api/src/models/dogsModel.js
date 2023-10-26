const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Dogs', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    height: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    weight: {
      type: DataTypes.JSONB,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      defaultValue: 'https://malaquitas.uy/wp-content/uploads/sites/13/2021/09/VA-1034.jpg',
    }
  }, { timestamps: false });
};
