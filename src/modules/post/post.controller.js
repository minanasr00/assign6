import { Router } from "express";
import { commentCount, deletePost, makePost, PostDetails } from "./post.service.js";

const router = Router()

router.post("/", async (req, res, next) => {
    const result = await makePost(req.body)
    return res.status(201).json({ message: "Post created successfully", result })
})

router.delete("/:id", async (req, res, next) => {
    const result = await deletePost(req.params.id,req.query.userId)
    return res.status(200).json({ message: "Post Deleted" })
 })

router.get("/details", async (req, res, next) => {
    const result = await PostDetails()
    return res.status(200).json({ message: "Post Details", result })
})

router.get("/comment-count", async (req, res, next) => {
    const result = await commentCount()
    return res.status(200).json({ message: "Post Comment Count", result})
})
export default router