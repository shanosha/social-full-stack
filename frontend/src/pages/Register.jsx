import { useState } from "react"
import { userClient } from "../clients/api"
import { useUser } from "../context/UserContext"
import { useNavigate } from "react-router-dom"

function Register() {

    const { setUser } = useUser()

    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: '',
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target
        setForm({
            ...form,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        try {

            // send the form data to our backend
            const { data } = await userClient.post('/register', form)
            console.log(data)
        
            // take the token and store it locally
            localStorage.setItem("token", data.token)

            // save some user data in our state
            setUser(data.user)
            
            // navigate to the feed
            navigate("/feed")

        }
        catch(err) {
            console.dir(err)
            alert(err.response.data.message)
        }
    }

    return (
        <div>
            <h1>Register Page</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                <label htmlFor="username">Username:</label>
                <input
                    value={form.username}
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="text"
                    required
                />
                </div>

                <div className="form-row">
                <label htmlFor="email">Email:</label>
                <input
                    value={form.email}
                    onChange={handleChange}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    pattern=".+@.+\..+"
                    required
                />
                </div>

                <div className="form-row">
                <label htmlFor="password">Password:</label>
                <input
                    value={form.password}
                    onChange={handleChange}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="new-password"
                    required
                />
                </div>

                <button>Register</button>
            </form>
        </div>
    )
}

export default Register