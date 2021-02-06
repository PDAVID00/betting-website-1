import React, {useState, useEffect} from "react"

import {BrowserRouter as Router, Redirect, Route, Switch} from "react-router-dom" 
import { createBrowserHistory } from "history";

import Nav from "./components/Nav/Nav"
import LogIn from "./components/LogIn/LogIn"
import SignIn from "./components/SignIn/SignIn"
import Profile from "./components/Profile/Profile"

import Games from "./components/Games/Games"

import Roulette from "./components/Roulette/Roulette"
import BlackJack from "./components/BlackJack/BlackJack"
import Crash from "./components/Crash/Crash"
import Jackpot from "./components/Jackpot/Jackpot"

import NotFound404 from "./components/404/404"

import "./App.scss"

const App = () => {
    return (
        <div className="app">            
            <Router basename="/">
                <Nav/>
                <Switch>
                    <Route path="/" exact>
                        <Redirect to="/Games"/>
                    </Route>
                    <Route path="/SignIn" exact component={SignIn}/>
                    <Route path="/LogIn" exact component={LogIn}/>
                    <Route path="/profile" exact component={Profile}/>
                    <Route path="/Games" exact component={Games}/>
                    <Route path="/Games/roulette" exact component={Roulette}/>
                    <Route path="/Games/blackjack" exact component={BlackJack}/>
                    <Route path="/Games/crash" exact component={Crash}/>
                    <Route path="/Games/jackpot" exact component={Jackpot}/>
                    <Route component={NotFound404}/>
                </Switch>
            </Router>
        </div>
    )
}


export default App