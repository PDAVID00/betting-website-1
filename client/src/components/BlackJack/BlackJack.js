import React, {useContext} from "react"
import {Redirect} from  "react-router-dom"

import "./BlackJack.scss"


import { configContext } from "../../App";
const BlackJack = () => {
    const context = useContext(configContext);
    return context.loggedIn ? (
        <div>
            BlackJack
        </div>
    ) : <Redirect to="/LogIn"/>
}

export default BlackJack