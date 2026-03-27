import express from 'express'
import Post from '../models/Post.js'
import { authMiddleware } from '../utils/auth.js'

const router = express.Router()

router.use(authMiddleware)

router.post('/', async (req, res) => {
    try{
        const post = await Post.create({
            ...req.body,
            author: req.user._id
        })
        res.status(200).json(post)
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

router.get('/', async (req, res) => {
    try{
        // this returns all posts, but can be restricted to the user's posts, {author: req.user._id}
        const posts = await Post.find({})
            .sort({ createdAt: -1 })
            .populate('author', 'username')

        res.status(200).json(posts)
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

// DELETE /api/posts/:id
router.delete('/:id', async (req, res) => {
    try{
        // find the post based on route parameter
        const post = await Post.findById(req.params.id)

        // does the post exist
        if(!post){
            return res.status(404).json({ message: 'No post with that id exists' })
        }

        // is the post's id the same as the logged in user's id
        if(post.author.toString() !== req.user._id){
            return res.status(403).json({ message: 'User does not own this post' })
        }

        // proceed with deleting the post
        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: 'Post deleted successfully' })
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

export default router