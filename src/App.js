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
      
      pointer : 0,
      
      currentState : "start",
      
      stateList : {
        
        start : {
          a : {
            write : '',
            move : 'R',
            newState : 'haveA'
          },

          b : {
            write : '',
            move : 'R',
            newState : 'haveB'
          },

          blank : {
            write : '',
            move : 'R',
            newState : 'accept'
          }
        },

        haveA : {
          a : {
            write : 'a',
            move : 'R',
            newState : 'haveA'
          },

          b : {
            write : 'b',
            move : 'R',
            newState : 'haveA'
          },

          blank : {
            write : '',
            move : 'L',
            newState : 'matchA'
          }
        },

        haveB : {
          a : {
            write : 'a',
            move : 'R',
            newState : 'haveB'
          },

          b : {
            write : 'b',
            move : 'R',
            newState : 'haveB'
          },

          blank : {
            write : '',
            move : 'L',
            newState : 'matchB'
          }
        },

        matchA : {
          a : {
            write : '',
            move : 'L',
            newState : 'back'
          },

          b : {
            write : 'b',
            move : 'L',
            newState : 'reject'
          },

          blank : {
            write : '',
            move : 'L',
            newState : 'accept'
          }
        },

        matchB : {
          a : {
            write : 'a',
            move : 'L',
            newState : 'reject'
          },

          b : {
            write : '',
            move : 'L',
            newState : 'back'
          },

          blank : {
            write : '',
            move : 'L',
            newState : 'accept'
          }
        },

        back : {
          a : {
            write : 'a',
            move : 'L',
            newState : 'back'
          },

          b : {
            write : 'b',
            move : 'L',
            newState : 'back'
          },

          blank : {
            write : '',
            move : 'R',
            newState : 'start'
          }
        },

        accept : {
        },

        reject : {
        }

      },
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
