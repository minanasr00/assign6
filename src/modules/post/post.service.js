import { sequelize } from "../../DB/connection.db.js";
import { commentModel, postModel, userModel } from "../../DB/model/index.js";

export const makePost = async ({ title, content, userId }) => {
    const post = await postModel.create({ title, content, userId })
    return post
}

export const deletePost = async (id,userId) => {
    const post = await postModel.findByPk(id)
    if (post.userId != userId) { 
        throw new Error("You are not authorized to delete this post")
    }
    if (!post) {
        throw new Error("Post not found")
    }

    const deleted = await postModel.destroy({ where: { id: id } })
    return deleted
}

export const PostDetails = async () => {
    const posts = await postModel.findAll({
        attributes: ['id', 'title'],
        include: [
            {
                model: userModel,
                attributes: ['name']
            },
            {
                model: commentModel,
                attributes: ['id', 'content']
            }
        ]
    })
    return posts
}
 
export const commentCount = async () => {
    const posts = await postModel.findAll({
        attributes: [
            'id',
            'title',
            [sequelize.fn('COUNT', sequelize.col('comments.id')), 'commentCount']
        ],
        include: [
            {
                model: commentModel,
                attributes: []
            }
        ],
    })
    return posts
 }