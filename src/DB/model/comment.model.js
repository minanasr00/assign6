import { DataTypes } from "sequelize";
import { sequelize } from "../connection.db.js";
import { postModel } from "./post.model.js";
import { userModel } from "./user.model.js";





export const commentModel = sequelize.define('Comment', {
    content: {
        type: DataTypes.TEXT,
    },

})


commentModel.belongsTo(postModel, { foreignKey: 'postId' });
commentModel.belongsTo(userModel, { foreignKey: 'userId' });
postModel.hasMany(commentModel, { foreignKey: 'postId' });
userModel.hasMany(commentModel, { foreignKey: 'userId' });

