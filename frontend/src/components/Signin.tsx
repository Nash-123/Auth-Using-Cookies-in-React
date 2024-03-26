import { useState } from "react"
import { BACKEND_URL } from "../config"
import axios from "axios"


export const Signin = () => {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    return  <div>
        <input onChange={(e) => {
            setUsername(e.target.value);
        }} type="text" placeholder="username" />
        <input onChange={(e) => {
            setPassword(e.target.value);
        }} type="password" placeholder="password" />
        <button onClick={async () => {
            await axios.post(`${BACKEND_URL}/signin`, {
                username,
                password
            }, {
                withCredentials: true, // Needs to be there else it wont send the cookie
                 // When your frontend and backend are set on Diff websites then you need this else in React.js where frontend and backend are set at same  place we'll need it
            });
            alert("you are logged in")
        }}>Submit</button>
    </div> 
}