import { userModel } from "../../DB/model/index.js";


export const signup = async ({ name, email, password, role }) => {
    console.log(name);
    const userExists = await userModel.findOne({ where: { email } })
    if (userExists) {
        throw new Error("Email already exists")
    }
    const user = new userModel({ name, email, password, role })
    const result = await user.save()
    return result
}
