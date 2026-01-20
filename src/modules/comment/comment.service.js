
import { Op } from 'sequelize';
import { commentModel, postModel, userModel } from '../../DB/model/index.js';


export const createComments = async ({comments}) => {
    const comment = await commentModel.bulkCreate(comments);
    return comment;
}

export const updateComment = async (id, { content, userId }) => {
    const comment = await commentModel.findByPk(id);
    if (!comment) {
        throw new Error("Comment not found");
    }
    if (comment.userId !== userId) {
        throw new Error("You are not authorized to update this comment");
    }
    const updatedComment = await commentModel.update({content}, {where: {id}});
    return updatedComment;
}

export const findOrCreateComment = async ({ content, userId, postId }) => {
    const findComment = await commentModel.findAll({ where: { content, userId, postId } });
    console.log(findComment);
    if (findComment.length > 0) { 
        return findComment
    }
    const [comment,created] = await commentModel.upsert({ content, userId, postId });
    return { comment, created };
}

export const searchComments = async (query) => { 
    console.log(query);
    
    const comments = await commentModel.findAndCountAll(
        {
            where: {
                content: {
                    [Op.like] : `%${query}%`
                }
            } 
        }
    )
    if (comments.count === 0) {
        throw new Error("No comments found");
    }
    return comments;
}

export const newestComments = async (postId) => { 
    const comments = await commentModel.findAll(
        {
            where: {postId},
            order: [['createdAt', 'DESC']],
            limit: 3
        }
    )
    return comments;
}

export const getCommentDetails = async (id) => {

    const comment = await commentModel.findByPk(id, {
        attributes: ['id', 'content'],
        include: [
            {
                model: userModel,
                attributes: ['id', 'name', 'email']
            },
            {
                model: postModel,
                attributes: ['id', 'title', 'content']
            }
        ]
    });
    if (!comment) {
        throw new Error("Comment not found");
    }
    return comment
 }