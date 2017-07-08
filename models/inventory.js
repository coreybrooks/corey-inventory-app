
module.exports = function(sequelize, DataTypes) {
  var Inventory = sequelize.define("Inventory", {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    date: {
        type: DataTypes.DATEONLY        
    },
    itemNumber: {
      type: DataTypes.INTEGER,
      allowNull: false  
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitSize: {
        type: DataTypes.STRING,
        allowNull: true
    },
    area1: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    area2: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    total: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    dailyNeed: {
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
return Inventory;
};
