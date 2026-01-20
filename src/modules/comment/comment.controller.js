import { Router } from "express";
import { createComments, findOrCreateComment, getCommentDetails, newestComments, searchComments, updateComment } from "./comment.service.js";
const router = Router();

router.post("/", async (req, res, next) => {
  const result = await createComments(req.body);
    return res.status(201).json({massage:"comments created successfully", result });
})

router.patch("/:commentId", async (req, res, next) => {
    const result = await updateComment(req.params.commentId, req.body);
    return res.status(200).json({ message: "comments updated successfully", result });
});

router.post("/find-or-create", async (req, res, next) => {
    const comment = await findOrCreateComment(req.body);
    return res.status(200).json(comment );
 })

router.get("/search", async (req, res, next) => {
    const result = await searchComments(req.query.word);
    return res.status(200).json(result);
})

router.get("/newest/:postId", async (req, res, next) => { 
    const result = await newestComments(req.params.postId);
    return res.status(200).json(result);
})

router.get("/details/:id", async (req, res, next) => { 
    const result = await getCommentDetails(req.params.id);
    return res.status(200).json(result);
})
export default router;
