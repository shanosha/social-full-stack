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
        const posts = await Post.find({author: req.user._id})
            .sort({ createdAt: -1 })
            .populate('author', 'username')

        res.status(200).json(posts)
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
})

export default router