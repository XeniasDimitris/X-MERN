/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react"
import "./Nav.css"
import { Link } from "react-router-dom"

//μένει το κουμπί Logout
// η λειτουργικότητα Log-In, Log-out , έτσι ώστε όταν κάνεις refresh να μην σε πάει πίσω στην αρχική
// και όταν δεν έχεις κάνει log-in να μην έχεις πρόσβαση στα '/παθς'



function Nav() {
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-dark">
                <a className="navbar-brand text-white" href="">X-MERN&nbsp;<i class="fas fa-charging-station"></i></a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto">
                        <Link to="./ActualTotalLoad">
                            <li className="nav-item active">
                                <a className="nav-link text-white ml-5" >ActualTotalLoad&nbsp;<i class="far fa-lightbulb"></i><span className="sr-only">(current)</span></a>
                            </li>
                        </Link>
                        <Link to="./AggregatedGenerationPerType">
                            <li className="nav-item">
                                <a className="nav-link text-white ml-5" href="#">AggregatedGenerationPerType&nbsp;<i class="fas fa-broadcast-tower"></i></a>
                            </li>
                        </Link>
                        <Link to="./DayAheadTotalLoadForecast">
                            <li className="nav-item">
                                <a className="nav-link disabled text-white ml-5" href="#" tabindex="-1" aria-disabled="true">DayAheadTotalLoadForecast&nbsp;<i class="far fa-sun"></i></a>
                            </li>
                        </Link>
                    </ul>
                </div>
            </nav>


        </div>
    )
}

export default Nav