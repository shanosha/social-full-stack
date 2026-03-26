import jwt from 'jsonwebtoken'

const secret = process.env.JWT_SECRET

export async function authMiddleware(req, res, next) {
    try {
        // check if there is a token
        let token = req.headers.authorization
        if (!token) return res.status(403).json({ message: 'No token provided' })
        
        // remove the 'Bearer ' part of the token
        token = token.split(' ').pop().trim()

        // verify the token, and extract the payload "data" using deconstruction
        const { data } = jwt.verify(token, secret)

        // pass the payload to req.user
        req.user = data

        // move onto the next middleware or route
        next()
    }
    catch(err) {
        console.log(err.message)
        res.status(400).json({ message: err.message })
    }
}