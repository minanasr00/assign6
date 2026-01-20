import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";

export const users = []


export const userModel = sequelize.define('User', {
    name: {
        type: DataTypes.STRING,
        
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        validate: {
            isEmail: true,
        },
    },
    password: {
        type: DataTypes.STRING,
        validate: {
            checkPassword(value) {
                if (value.length < 6) {
                    throw new Error("Password must be at least 6 characters long");
                }
            }
        }
    },
    role: {
        type: DataTypes.ENUM('admin', 'user'),
    }
}, {
    hooks: {
        beforeCreate: (user, options) => { 
            const checkName = (name) => { 
                if (name.trim().length < 3) {
                    throw new Error("Name must be longer than 2 characters");
            }
            }
            checkName(user.name);
        }
    }
});