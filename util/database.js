require('dotenv').config();

const Sequelize=require('sequelize');

const sequelize=new Sequelize("coralmango",process.env.DB_USERNAME,process.env.DB_PASSWORD,{
    dialect: 'mysql',
    host: process.env.DB_HOST,
    
});
module.exports=sequelize;
