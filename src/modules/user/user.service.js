
import {userModel} from '../../DB/model/index.js'
export const profile   = (id)=>{
    const user = userModel.find(ele => ele.id == id)
    return user
}

export const updateUser = async (id, data) => { 
    const userExists = await userModel.findByPk(id);
    console.log(userExists);
    
    if (!userExists) {
        const newUser= await userModel.create({ ...data },{validate:false});
        return newUser;
    } else {
        const result = await userModel.update({ ...data }, { where: { id } });
        return result;
    }
}

export const findUser = async (email) => { 
    const user = await userModel.findOne({ where: { email } });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}

export const findUserByID = async (id) => {
    const user = await userModel.findByPk(id,{ attributes: { exclude: ['role'] } });
    if (!user) {
        throw new Error("User not found");
    }
    return user;
}