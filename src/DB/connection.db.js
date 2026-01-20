import { Sequelize } from 'sequelize'
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from './../../config/config.service.js';

export const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  dialect: 'mysql',
  port: DB_PORT,
  
});


export const asyncConnection = async () => {
  try {
        sequelize.sync({ alter: false , force: false});
        console.log("All models were synchronized successfully.");
    } catch (error) {
        console.log("An error occurred while synchronizing the models:", error);
  }
}