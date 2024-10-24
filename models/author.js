'use strict';

module.exports = (sequelize, DataTypes) => {
  class Author extends sequelize.Sequelize.Model {
    static associate(models) {
      // Define the association here
      Author.belongsTo(models.Book, { foreignKey: 'bookid' });
  }
  }

  Author.init(
    {
     name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      country: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize, // Ensure that this is the sequelize instance
      modelName: 'Author', // Model name
    }
  );

  return Author;
};