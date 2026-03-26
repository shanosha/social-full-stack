import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { token, userClient } from '../clients/api'
const UserContext = createContext(null)

// check if there's a token, if so assume that there is a user
const initialUser = token() ? { username: null } : null

// custom provider to wrap our app
function UserProvider({ children }) {

    // set the initial state to null or a temporary user
    const [user, setUser] = useState(initialUser)

    const navigate = useNavigate()

    const logout = () => {
        setUser(null)
        localStorage.removeItem("token")
        navigate('/login')
    }

    useEffect(() => {

        try {
            
            async function getUser() {
            
                // check if there's a token (if not, then we can skip step)
                if (!token()) return

                // use the token to cerify the user (is token valid? is it expired?)
                const { data } = await userClient.get('/')

                // if verified that token is legit, take the user data and save it to state
                setUser(data)

            }

            getUser()
        }
        catch(err) {
            // if verification fails, logout the user
            console.log(err)
            logout()
        }
       
    }, [])

    const value = {
        user,
        setUser,
        logout
    }

    return (
        <UserContext.Provider value={value}>
            {children}
        </UserContext.Provider>
    )
}

// custom hook to easily access context value
export function useUser() {
    return useContext(UserContext)
}

export default UserProvider