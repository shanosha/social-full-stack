import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/.+@.+\..+/, "Must use a valid email address"]
    },
    password: {
        type: String,
        required: true,
        minLength: 5
    }
})

const User = mongoose.model('User', userSchema)

export default User