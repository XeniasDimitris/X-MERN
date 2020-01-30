import React from "react"
import Nav from "./Components/Nav"
import Actual from "./Components/Actual"
import Aggregated from "./Components/Aggregated"
import DayAhead from "./Components/DayAhead"
import {BrowserRouter as Router, Route} from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'



class Home extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedin: false,
            token: this.props.token
        }
    }




    render() {
        return (
            <Router>
                <div>
                    <Nav />
                    <Route path = "/ActualTotalLoad" component = {Actual} token = {this.state.token} />
                    <Route path = "/AggregatedGenerationPerType" component = {Aggregated} token = {this.state.token}/>
                    <Route path = "/DayAheadTotalLoadForecast" component = {DayAhead} token = {this.state.token}/>
                </div>
            </Router>

        )
    }
}

export default Home

