import React, {useContext} from 'react';
import { Redirect } from 'react-router';


import { configContext } from "../../App";
const Crash = () => {
    const context = useContext(configContext);
    return context.loggedIn ? (
        <div>
            Crash
        </div>
    ) : <Redirect to="/LogIn"/>
}

export default Crash;
