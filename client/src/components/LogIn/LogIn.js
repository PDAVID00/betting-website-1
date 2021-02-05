import React, {useState, useEffect} from "react"
import {Link} from "react-router-dom"
import "./LogIn.scss"

const LogIn = () => {
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    return (
        <div>
            {/* <form className="form-LogIn" onSubmit={(e) => {
                const name = document.querySelector(".input-name")
                const password = document.querySelector(".input-password")
            }}>
                <label >First name:</label>
                <input onChange={e => setName(e.target.value)}type="text" className="input-name" name="input-name"/><br/>
                
                <label >Password</label><br/>
                <input onChange={e => setPassword(e.target.value)} type="password" className="input-password" name="input-password"/>

                <Link to="/Games">
                  <button>
                      LogIn
                  </button>
                </Link>
            </form> */}
        </div>
    )
}

export default LogIn