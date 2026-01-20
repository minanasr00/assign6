import { Router } from 'express'
import {  signup } from './auth.service.js';
const router = Router(); 
router.post("/users/signup", async (req, res, next) => {
    console.log(req.body);
    
    const result = await signup(req.body)
    
    return res.status(201).json({ message: "User added successfully", result })
})



export default router