
module.exports = function(sequelize, DataTypes) {
  var Area = sequelize.define("Area", {
    companyName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    area: {
      type: DataTypes.STRING,
      allowNull: true
    },
    color: {
        type: DataTypes.STRING,
        allowNull: true
    }
  }, {
      timestamps: false
  });
return Area;
};
