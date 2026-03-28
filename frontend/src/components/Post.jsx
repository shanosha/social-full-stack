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
        <div className='post'>
            <h3>{post.title}</h3>
            <p>{post.body}</p>
            <div className='metadata'>
                <p>Posted by <strong className='author'>{post.author.username}</strong> on {date.toLocaleDateString()} at {date.toLocaleTimeString()}</p>
            </div>
            {(post.author._id === user._id) && (<button onClick={handleDelete}>Delete</button>)}
        </div>
    )
}

export default Post