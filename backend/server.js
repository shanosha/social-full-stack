import 'dotenv/config'
import express from 'express'
import './config/connection.js'
import userRoutes from './routes/users.js'
import postRoutes from './routes/posts.js'
import cors from 'cors'

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => console.log(`Listening on port: http://localhost:${port}`))