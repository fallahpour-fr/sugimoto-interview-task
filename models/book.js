'use strict';

module.exports = (sequelize, DataTypes) => {
  class Book extends sequelize.Sequelize.Model {
    static associate(models) {
      // Define the association here
      Book.belongsTo(models.Author, { foreignKey: 'authorid' });
  }
  }

  Book.init(
    {
     title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      price:{
        type:DataTypes.NUMBER,
        allowNull:false
     },
     publish_date:{
      type: DataTypes.DATEONLY,
      allowNull: false,
    }
    },
    {
      sequelize, // Ensure that this is the sequelize instance
      modelName: 'Book', // Model name
    }
  );

  return Book;
};