const Sequelize=require('sequelize');

const sequelize=require('../util/database');

const Signup=sequelize.define('signup',{
  
   email:{
    type: Sequelize.STRING,
    allowNull:false,
    primaryKey:true
    },
   
   name:{
    type: Sequelize.STRING,
    allowNull:false
   },
  otp:{
    type: Sequelize.STRING,
    allowNull: false
  } ,
  emailstatus:{
    type: Sequelize.STRING,
  },
  expiry: {
        type: Sequelize.DATE,
        allowNull: false
      },
},

);

module.exports =Signup;