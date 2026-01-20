import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";
import { userModel } from "./user.model.js";


export const postModel = sequelize.define('Post', {
    title: {
        type: DataTypes.STRING,
    },
    content: {
        type: DataTypes.TEXT,
    },

},
    {
    paranoid: true,
});

postModel.belongsTo(userModel, { foreignKey: 'userId' });
userModel.hasMany(postModel, { foreignKey: 'userId' });