
module.exports = function(sequelize, DataTypes) {
  var Company = sequelize.define("Company", {
    // The email cannot be null, and must be a proper email before creation
    // this will be used to identify the users
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    item: {
      type: DataTypes.STRING,
      allowNull: true
    },
    unitSize: {
        type: DataTypes.STRING,
        allowNull: true
    },
    area1: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    area1completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    color1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    area2: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    area2completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    color2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    dailyNeeds: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    numberOfDays: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    order:{
        type: DataTypes.FLOAT,
        allowNull: true
    }
  }, {
      timestamps: true
  });
return Company;
};
