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
      [event.target.id] : event.target.value,
      pointer : 0,
      currentState : 'start',
    })
  }

  trigger()
  {
    if(this.state.currentState !== 'accept' && this.state.currentState !== 'reject')
    {
      this.simulate();
    }
      
  }

  simulate()
  {
    const stateList = {
      start : {
        a : {
          write : ' ',
          move : 'R',
          newState : 'haveA'
        },

        b : {
          write : '',
          move : 'R',
          newState : 'haveB'
        },

        blank : {
          write : ' ',
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
          write : ' ',
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
          write : ' ',
          move : 'L',
          newState : 'matchB'
        }
      },

      matchA : {
        a : {
          write : ' ',
          move : 'L',
          newState : 'back'
        },

        b : {
          write : 'b',
          move : 'L',
          newState : 'reject'
        },

        blank : {
          write : ' ',
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
          write : ' ',
          move : 'L',
          newState : 'back'
        },

        blank : {
          write : ' ',
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
          write : ' ',
          move : 'R',
          newState : 'start'
        }
      },

      accept : {
      },

      reject : {
      }
    };
    
    console.log(this.state)

      var currState = this.state.currentState;
      var pointer = this.state.pointer;
      var input = this.state.input + " ";


      var newinput = input;
      var newpointer = pointer;
      var newState = currState;
      const conditions = stateList[currState];
    
      if(input[pointer] === 'a')
      {
        newState = conditions['a'].newState;
        newinput = input.substring(0, pointer) + conditions['a'].write + input.substring(pointer + 1);
        if(conditions['a'].move === 'L')
          newpointer -=1;
        else
          newpointer +=1;
      }

      else if(input[pointer] === 'b')
      {
        newState = conditions['b'].newState;
        newinput = input.substring(0, pointer) + conditions['b'].write + input.substring(pointer + 1);
        if(conditions['b'].move === 'L')
          newpointer -=1;
        else
          newpointer +=1;
      }

      else if(input[pointer] === ' ')
      {
        newState = conditions['blank'].newState;
        newinput = input.substring(0, pointer) + conditions['blank'].write + input.substring(pointer + 1);
        if(conditions['blank'].move === 'L')
          newpointer -=1;
        else
          newpointer +=1;
      }

      else
        newState = 'reject';
      setTimeout(() => {
        this.setState({
          pointer : newpointer,
          input : newinput,
          currentState : newState,
        })
        this.trigger();
      }, 750);
      
  }



  constructor()
  {
    super();
    this.state = {
      loading : true,
      input : "",
      pointer : 0,      
      currentState : "start",
    }

    this.handleChange = this.handleChange.bind(this)
    this.simulate = this.simulate.bind(this)
    this.trigger = this.trigger.bind(this)
  }

  render(){
    console.log(this.state)
    const accept = this.state.currentState === 'accept';
    const reject = this.state.currentState === 'reject'; 

    return (
      <div className="App">
        <div className = "container">
          <h1 className = "my-4">Turing Machine Simulator</h1>
          <br />


          <div class="input-group mb-3">
            <div class="input-group-prepend">
              <button class="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Dropdown</button>
              <div class="dropdown-menu">
                <a class="dropdown-item" href="#">Action</a>
                <a class="dropdown-item" href="#">Another action</a>
                <a class="dropdown-item" href="#">Something else here</a>
                <div role="separator" class="dropdown-divider"></div>
                <a class="dropdown-item" href="#">Separated link</a>
              </div>
            </div>
            <input id = "input" value = {this.state.input} onChange = {this.handleChange} className="form-control form-control-lg" type="text" placeholder="Enter string of a and b here" />
          </div>
          
          
          <br />
          <br />
          <br />

          <Tape input = {this.state.input} pointer = {this.state.pointer}/>
          <br />
          <br />
          <br />
          <button type="button" class="btn btn-primary" onClick = {this.trigger}>Simulate</button>

          {accept ? 
          <div className="alert alert-success my-3" role="alert">
            Success!
          </div> : <div /> 
          }

          {reject ? 
          <div className="alert alert-danger my-4" role="alert">
            Failure!
          </div> : <div /> 
          }
          
        </div>
      </div>
    );
  }
  
}

export default App;
