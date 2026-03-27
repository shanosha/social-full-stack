import { postClient } from '../clients/api.js'
import { useUser } from '../context/UserContext.jsx'

function Post({ post, setPosts }) {

    const date = new Date(post.createdAt)
    const { user } = useUser()

    const handleDelete = async () => {
        try {
            // remove post from database
            await postClient.delete(`/${post._id}`)
            // remove post from state
            setPosts(posts => posts.filter(p => p._id !== post._id))
        }
        catch(err) {
            console.dir(err)
            alert(err.response.data.message)
        }
    }
    
    return (
        <div>
            <h3>{post.title}</h3>
            <h4>by {post.author.username}</h4>
            <div>{date.toLocaleDateString()} {date.toLocaleTimeString()}</div>
            <p>{post.body}</p>
            {(post.author._id === user._id) && (<button onClick={handleDelete}>X</button>)}
        </div>
    )
}

export default Post