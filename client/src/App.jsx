import React from "react"

import {BrowserRouter as Router, Route, Switch} from "react-router-dom" 

import Nav from "./components/Nav/Nav"
import LogIn from "./components/LogIn/LogIn"
import SignIn from "./components/SignIn/SignIn"
import Profile from "./components/Profile/Profile"

import Games from "./components/Games/Games"

import Roulette from "./components/Roulette/Roulette"
import BlackJack from "./components/BlackJack/BlackJack"
import Crash from "./components/Crash/Crash"
import Jackpot from "./components/Jackpot/Jackpot"


import "./App.scss"

const App = () => {
    return (
        <div className="app">            
            <Router basename="/">
                <Nav/>
                <Switch>  
                    <Route path="/" exact component={LogIn}/>
                    <Route path="/SignIn" exact component={SignIn}/>
                    <Route path="/profile" exact component={Profile}/>
                    <Route path="/Games" exact component={Games}/>
                    <Route path="/Games/roulette" exact component={Roulette}/>
                    <Route path="/Games/blackjack" exact component={BlackJack}/>
                    <Route path="/Games/crash" exact component={Crash}/>
                    <Route path="/Games/jackpot" exact component={Jackpot}/>
                </Switch>
            </Router>
        </div>
    )
}


export default App