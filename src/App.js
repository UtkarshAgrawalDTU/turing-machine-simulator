import './App.css';
import {React, Component} from "react"
import Tape from "./Tape"
class App extends Component
{

  componentDidMount()
  {
    this.setState({
      loading : false,
    });
  }

  handleChange(event)
  {
    this.setState({
      [event.target.id] : event.target.value
    })
  }

  constructor()
  {
    super();
    this.state = {
      loading : true,
      input : "",
      pointer : 0
    }

    this.handleChange = this.handleChange.bind(this)
  }

  render(){
    console.log(this.state)
    return (
      <div className="App">
        <div className = "container">
          <h1 className = "my-4">Palindrome Simulator using Turing Machine</h1>
          <input id = "input" value = {this.state.input} onChange = {this.handleChange} className="form-control form-control-sm" type="text" placeholder="Enter string of a and b here" />
          <Tape input = {this.state.input} pointer = {this.state.pointer}/>
        </div>
      </div>
    );
  }
  
}

export default App;
