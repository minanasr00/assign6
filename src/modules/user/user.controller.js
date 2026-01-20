import { Router } from "express";
import { findUser, findUserByID, profile, updateUser } from "./user.service.js";
const router=Router()

router.get("/" , (req,res,next)=>{
    const result  = profile(req.query.id)
    return res.status(200).json({message:"Profile" , result})
})

router.put("/:id", async (req, res, next) => {
    const result = await updateUser(req.params.id, req.body);
    return res.status(201).json({ message: "User updated or created successfully", result })
})

router.get("/by-email", async (req, res, next) => { 
    const result = await findUser(req.query.email)
    return res.status(200).json({ message: "User by email", result })
})
router.get("/:id", async (req, res, next) => { 
    const result = await findUserByID(req.params.id)
    return res.status(200).json({ message: "User by ID", result })
})



export default router