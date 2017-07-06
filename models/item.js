
module.exports = function(sequelize, DataTypes) {
  var Item = sequelize.define("Item", {
    companyName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    item: {
      type: DataTypes.STRING,
      allowNull: false
    },
    unitSize: {
        type: DataTypes.FLOAT,
        allowNull: true
    },
    area1: {
        type: DataTypes.STRING,
        allowNull: true
    },
    area2: {
        type: DataTypes.STRING,
        allowNull: true
    },
    dailyNeed: {
        type: DataTypes.FLOAT,
        allowNull: true
    }
  });
return Item;
};
