
module.exports = function(sequelize, DataTypes) {
  var Area = sequelize.define("Area", {
    // The email cannot be null, and must be a proper email before creation
    // this will be used to identify the users
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true
      }
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
