const config = require("../config/db");

const Datatype = require("sequelize");
const sequelize = new Datatype (
    config.DB,
    config.USER,
    config.PASSWORD,
    {
        host: config.HOST,
        dialect: config.dialect,
        pool:{
            max: config.pool.max,
            min: config.pool.min,
            acquire: config.pool.acquire,
            idle: config.pool.idle
        }
    }
);
const db ={};
db.Datatype=Datatype;
db.sequelize=sequelize;

db.employee = require("../models/employee.models")(sequelize, Datatype);
db.setting = require("../models/setting.models")(sequelize, Datatype);

//One_to_One 
db.employee.hasOne(db.setting,{
    onDelete: 'CASCADE'
});
db.setting.belongsTo(db.employee);

module.exports = db;