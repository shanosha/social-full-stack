import { useEffect, useState } from "react"
import { postClient } from "../clients/api"
import Post from "../components/Post"
import { useUser } from "../context/UserContext"

function Feed() {

    const [posts, setPosts] = useState([])
    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const {user} = useUser()

    useEffect(() => {
        async function getData() {
            try {

                // get user posts from DB
                const { data } = await postClient.get('/')

                // save the user's posts in the component's state
                setPosts(data)

            }
            catch(err) {
                console.dir(err)
            }
        }
        getData()
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault()

        const getData = async () => {
            try {
                    
                    // make a POST request to create the post (using our state variables)
                    const { data } = await postClient.post('/', { title, body })

                    // add new post to our "posts" state
                    setPosts([
                        {
                            ...data,
                            author:{
                                username: user.username,
                                _id: user._id
                            }
                        },
                        ...posts
                    ])

                    // reset the form fields
                    setTitle('')
                    setBody('')

            }
            catch(err) {
                console.dir(err)
            }
        }
        getData()
                
    }

    return (
        <div>

            <h1>Feed Page</h1>

            <form onSubmit={handleSubmit}>
                <h2>Leave a post here:</h2>
                
                <label htmlFor="title">Title:</label>
                <input
                    type="text"
                    id="title"
                    name="title"
                    value={title}
                    required={true}
                    onChange={(e) => {setTitle(e.target.value)}}
                />
                
                <label htmlFor="body">Body:</label>
                <textarea
                    type="text"
                    id="body"
                    name="body"
                    value={body}
                    required={true}
                    onChange={(e) => {setBody(e.target.value)}}
                />

                <button>Submit</button>
            </form>

{(posts.length > 0) ?
                <h2>Posts</h2>
                :
                <p>No posts currently!</p>
            }
            {posts.map(post => <Post key={post._id} post={post} setPosts={setPosts} />)}

        </div>
    )
}

export default Feed