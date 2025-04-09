const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "database.sqlite",
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Wallet = require("./wallet")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.Trade = require("./trade")(sequelize, DataTypes);
db.Transaction = require("./transaction")(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;