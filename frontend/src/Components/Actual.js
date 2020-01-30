import React from "react"
import {SingleDatePicker} from "react-dates"
import moment from "moment"
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

// Μένει να μετατρέψεις το Date από το state σε Day, Month, Year 
// Μετά να κάνεις το fetch για να έρθουν τα data 
// Μόλις έρθουν τα data να τα παρουσιάσεις σε καινούργιο component μέσω react routing 
// Και φυσικά να τα αναπαραστήσεις μέσω μιας βιβλιοθήκης
// και εννοείται όπως και για τις υπόλοιπες σελίδες, μένει και το css
// Ομοίως και για τα άλλα 3
// επίσης να τσεκάρω αν παίζει η αλλαγή σε country picker
class  Actual extends React.Component{

    constructor(){
        super()
        this.state={
            AreaName:'',
            Resolution:'',
            Day:'',
            Month:'',
            Year:'',
            focused:false,
            Date:moment()
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
   
    handleChange(event){
        const {name,value,type,checked} = event.target
        type === "checkbox" ? this.setState({ [name]: checked }) : this.setState({ [name]: value })
        console.log(this.state)
    }

    handleSubmit(event){
        event.preventDefault()
    }
   
    render(){
        return(
            <div>
                <form>
                    <input 
                    type='text'
                    name = 'AreaName'
                    placeholder='Select a country'
                    value = {this.state.AreaName}
                    onChange = {this.handleChange}/>
                </form>
                <br/>
                <label>
                    <input 
                        type="radio" 
                        name="Resolution"
                        value="PT15M"
                        checked={this.state.Resolution === "PT15M"}
                        onChange={this.handleChange}
                    /> PT15M
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        name="Resolution"
                        value="PT30M"
                        checked={this.state.Resolution === "PT30M"}
                        onChange={this.handleChange}
                    /> PT30M
                </label>
                <br />
                <label>
                    <input 
                        type="radio" 
                        name="Resolution"
                        value="PT60M"
                        checked={this.state.Resolution === "PT60M"}
                        onChange={this.handleChange}
                    /> PT60M
                </label>
                <br />
                <SingleDatePicker
                    date={this.state.Date} // momentPropTypes.momentObj or null
                    onDateChange={date => this.setState({ Date:date })} // PropTypes.func.isRequired
                    focused={this.state.focused} // PropTypes.bool
                    onFocusChange={({ focused }) => this.setState({ focused })} // PropTypes.func.isRequired
                    id="your_unique_id" // PropTypes.string.isRequired,
                    numberOfMonths = {1}
                    isOutsideRange = {()=>false}
                />
                <br/>
                <button onClick = {this.handleSubmit}>Submit</button>


            </div>
        )
    }
   
}


export default Actual
