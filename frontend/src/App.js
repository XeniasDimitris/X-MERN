import React from "react"
import "./App.css"
import Home from "./Home"
import 'bootstrap/dist/css/bootstrap.min.css'

// Προς αλλαγή: το app.js θα καλεί ένα ξεχωριστό κομπονεντ, το login.js 
// το οποίο απαξ και κανεις το λογκ ιν,  παιζεις μπαλα απο το home.js



class App extends React.Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      login: false,
      token: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.login = this.login.bind(this)
  }

  handleChange(event) {
    const { name, value } = event.target
    this.setState({
      [name]: value
    })
  }

  login() {
    if (this.state.email && this.state.password) {
      fetch("https://localhost:8765/user/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.state.email,
          password: this.state.password
        })
      }).then((response) => response.json())
        .then((result) => {
          console.log("Success:", result)
          localStorage.setItem('login', JSON.stringify({
            token: result.token
          }))
          if (result.token !== undefined) {
            this.setState({ login: true,
            token:result.token})
          }
          else {
            console.log("Wrong Username/Password")
          }
        })
        .catch(error => {
          console.error(error)
        })
    }
    else {
      console.log("Please fill correctly the form")
    }

  }


  render() {
      return (
        <div>
          
          {!this.state.login?
            <div>
            <h1>App</h1>
            <input type="text" name="email" placeholder="email" onChange={this.handleChange} /><br />
            <input type="password" name="password" placeholder="password" onChange={this.handleChange} /><br />
            <button onClick={this.login}>Login</button>
            </div>
            :
            <div>
               <Home path='/Home' token = {this.state.token}/> 
            </div>
           }
        </div>
      )
    }
  }


export default App