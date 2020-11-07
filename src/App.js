import './App.css';
import {React, Component} from "react"
import Tape from "./Tape"
import Footer from './Footer';
import Header from './Header';


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
      pointer : 1,
      currentState : 'start',
      input : 'B' + event.target.value + 'B',
    })
  }


  trigger()
  {   
    if(this.state.currentState !== 'accept' && this.state.currentState !== 'reject')
    {
      if(this.state.simulator === "Palindrome")
          this.simulatePalindrome();
          
      else if(this.state.simulator === "Divisible by 3")
          this.simulateDiv3();

      else if(this.state.simulator === "3 Equal Lengths")
          this.simulate3Equal();
    }
  }


  step()
  {
    if(this.state.currentState !== 'accept' && this.state.currentState !== 'reject')
    {
      if(this.state.simulator === "Palindrome")
          this.stepPalindrome();
          
      else if(this.state.simulator === "Divisible by 3")
          this.stepDiv3();

      else if(this.state.simulator === "3 Equal Lengths")
          this.step3Equal();
    }
  }


  reset(){
    this.setState({
          currentState : "start",
          pointer : 1,
          input : 'B' + this.state.input_user + 'B',
        })
  }



  simulate3Equal()
  {
    setTimeout(() => {
      this.step3Equal();
      this.trigger();
    },  750);
  }


  simulateDiv3()
  {
      setTimeout(() => {
        this.stepDiv3();
        this.trigger();
      },  1000);
        
  }


  simulatePalindrome()
  {
      setTimeout(() => {
        this.stepPalindrome();
        this.trigger();
      },  750);
      
  }



  stepPalindrome(){

    if(this.state.currentState === 'accept' || this.state.currentState === 'reject')
      return;

    const stateList = {
      start : {
        a : {
          write : 'B',
          move : 'R',
          newState : 'haveA'
        },

        b : {
          write : 'B',
          move : 'R',
          newState : 'haveB'
        },

        B : {
          write : 'B',
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

        B : {
          write : 'B',
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

        B : {
          write : 'B',
          move : 'L',
          newState : 'matchB'
        }
      },

      matchA : {
        a : {
          write : 'B',
          move : 'L',
          newState : 'back'
        },

        b : {
          write : 'b',
          move : 'L',
          newState : 'reject'
        },

        B : {
          write : 'B',
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
          write : 'B',
          move : 'L',
          newState : 'back'
        },

        B : {
          write : 'B',
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

        B : {
          write : 'B',
          move : 'R',
          newState : 'start'
        }
      },

      accept : {
      },

      reject : {
      }
    };

      var currState = this.state.currentState;
      var pointer = this.state.pointer;
      var input = this.state.input;

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

      else if(input[pointer] === 'B')
      {
        newState = conditions['B'].newState;
        newinput = input.substring(0, pointer) + conditions['B'].write + input.substring(pointer + 1);
        if(conditions['B'].move === 'L')
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
      },  750);

  }


  stepDiv3(){

    if(this.state.currentState === 'accept' || this.state.currentState === 'reject')
      return;

      var currState = this.state.currentState;
      var pointer = this.state.pointer;
      var input = this.state.input;

      var newinput = input;
      var newpointer = pointer;
      var newState = currState;
    
      if(currState === 'start')
      {
        if(input[pointer] === '1' || input[pointer] === '4' || input[pointer] === '7')
        {
          newpointer += 1;
          newState = 'q1';
        }

        else if(input[pointer] === '2' || input[pointer] === '5' || input[pointer] === '8')
        {
          newpointer += 1;
          newState = 'q2';
        }

        else if(input[pointer] === '0' || input[pointer] === '3' || input[pointer] === '6' || input[pointer] === '9')
        {
          newpointer += 1;
          newState = 'q0';
        }

        else if(input[pointer] === 'B')
        {
          newpointer -= 1;
          newState = 'reject';
        }

        else
          newState = 'reject';
      }

      else if(currState === 'q0')
      {
        if(input[pointer] === '1' || input[pointer] === '4' || input[pointer] === '7')
        {
          newpointer += 1;
          newState = 'q1';
        }

        else if(input[pointer] === '2' || input[pointer] === '5' || input[pointer] === '8')
        {
          newpointer += 1;
          newState = 'q2';
        }

        else if(input[pointer] === '0' || input[pointer] === '3' || input[pointer] === '6' || input[pointer] === '9')
        {
          newpointer += 1;
          newState = 'q0';
        }

        else if(input[pointer] === 'B')
        {
          newpointer -= 1;
          newState = 'accept';
        }

        else
          newState = 'reject';
      }


      else if(currState === 'q1')
      {
        if(input[pointer] === '1' || input[pointer] === '4' || input[pointer] === '7')
        {
          newpointer += 1;
          newState = 'q2';
        }

        else if(input[pointer] === '2' || input[pointer] === '5' || input[pointer] === '8')
        {
          newpointer += 1;
          newState = 'q0';
        }

        else if(input[pointer] === '0' || input[pointer] === '3' || input[pointer] === '6' || input[pointer] === '9')
        {
          newpointer += 1;
          newState = 'q1';
        }

        else if(input[pointer] === 'B')
        {
          newpointer -= 1;
          newState = 'reject';
        }

        else
          newState = 'reject';
      }

      else if(currState === 'q2')
      {
        if(input[pointer] === '1' || input[pointer] === '4' || input[pointer] === '7')
        {
          newpointer += 1;
          newState = 'q0';
        }

        else if(input[pointer] === '2' || input[pointer] === '5' || input[pointer] === '8')
        {
          newpointer += 1;
          newState = 'q1';
        }

        else if(input[pointer] === '0' || input[pointer] === '3' || input[pointer] === '6' || input[pointer] === '9')
        {
          newpointer += 1;
          newState = 'q2';
        }

        else if(input[pointer] === 'B')
        {
          newpointer -= 1;
          newState = 'reject';
        }

        else
          newState = 'reject';
      }

      else
        newState = 'reject';

      setTimeout(() => {
        this.setState({
          pointer : newpointer,
          input : newinput,
          currentState : newState,
        })
      },  1000);
  }


  step3Equal(){

    if(this.state.currentState === 'accept' || this.state.currentState === 'reject')
      return;

      var currState = this.state.currentState;
      var pointer = this.state.pointer;
      var input = this.state.input;

      var newinput = input;
      var newpointer = pointer;
      var newState = currState;

      if(currState === 'start')
      {
        if(input[pointer] === 'a')
        {
            newpointer +=1;
            newinput = input.substring(0, pointer) + 'X' + input.substring(pointer + 1);
            newState = 'qa'; 
        }

        else if(input[pointer] === 'Y')
        {
          newpointer += 1;
          newState = 'qY'
        }

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }

      else if(currState === 'qa')
      {
        if(input[pointer] === 'b')
        {
          newpointer +=1;
          newState = 'qb';
          newinput = input.substring(0, pointer) + 'Y' + input.substring(pointer + 1);
        }

        else if(input[pointer] === 'Y' || input[pointer] === 'a')
          newpointer +=1;

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }

      else if(currState === 'qb')
      {
        if(input[pointer] === 'c')
        {
          newpointer -=1;
          newState = 'qc';
          newinput = input.substring(0, pointer) + 'Z' + input.substring(pointer + 1);
        }

        else if(input[pointer] === 'Z' || input[pointer] === 'b')
          newpointer +=1;

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }

      else if(currState === 'qc')
      {
        if(input[pointer] === 'X')
        {
          newpointer +=1;
          newState = 'start';
        }

        else if(input[pointer] === 'a' || input[pointer] === 'b' || input[pointer] === 'Y' || input[pointer] === 'Z')
          newpointer -=1;

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }


      else if(currState === 'qY')
      {
        if(input[pointer] === 'Z')
        {
          newpointer +=1;
          newState = 'qZ';
        }

        else if(input[pointer] === 'Y')
          newpointer +=1;

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }

      else if(currState === 'qZ')
      {
        if(input[pointer] === 'B')
        {
          newpointer +=1;
          newState = 'accept';
        }

        else if(input[pointer] === 'Z')
          newpointer +=1;

        else
        {
          newpointer += 1;
          newState = 'reject';
        }
      }

      else if(currState === 'accept')
      {}

      else if(currState === 'reject')
      {}

      else
        newState = 'reject';


        setTimeout(() => {
          this.setState({
            pointer : newpointer,
            input : newinput,
            currentState : newState,
          })
        },  750);
  }



  selectPalindrome()
  {
    this.setState({
      simulator : "Palindrome",
      pointer : 1,
      currentState : "start", 
      input : 'B' + this.state.input_user + 'B',
    })
  }

  selectDiv3()
  {
    this.setState({
      simulator : "Divisible by 3",
      pointer : 1,
      currentState : "start", 
      input : 'B' + this.state.input_user + 'B',
    })
  }

  select3Equal()
  {
    this.setState({
      simulator : "3 Equal Lengths",
      pointer : 1,
      currentState : "start", 
      input : 'B' + this.state.input_user + 'B',
    })
  }



  constructor()
  {
    super();
    this.state = {
      loading : true,
      input : "BB",
      input_user : "",
      pointer : 1,      
      currentState : "start",
      simulator : "",
    }

    this.handleChange = this.handleChange.bind(this)
    this.simulatePalindrome = this.simulatePalindrome.bind(this)
    this.simulateDiv3 = this.simulateDiv3.bind(this)
    this.simulate3Equal = this.simulate3Equal.bind(this)
    
    this.trigger = this.trigger.bind(this)
    this.step = this.step.bind(this)
    this.reset = this.reset.bind(this)
    
    this.selectPalindrome = this.selectPalindrome.bind(this)
    this.selectDiv3 = this.selectDiv3.bind(this)
    this.select3Equal = this.select3Equal.bind(this)

    this.stepPalindrome = this.stepPalindrome.bind(this)
    this.stepDiv3 = this.stepDiv3.bind(this)
    this.step3Equal = this.step3Equal.bind(this)
  }



  render()
  {

    const accept = this.state.currentState === 'accept';
    const reject = this.state.currentState === 'reject'; 
    const simulator = this.state.simulator === "" ? "Select Problem" : this.state.simulator;


    return (
      <div className="App">
        <Header />
        <div className = "container my-5">

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">{simulator}</button>
              <div className="dropdown-menu">
                <a className="dropdown-item" onClick = {this.selectPalindrome}>Palindrome</a>
                <a className="dropdown-item" onClick = {this.selectDiv3} >Divisible by 3</a>
                <a className="dropdown-item" onClick = {this.select3Equal}>Three Equal Lengths</a>
              </div>
            </div>
            <input id = "input_user" value = {this.state.input_user} onChange = {this.handleChange} className="form-control form-control-lg" type="text" placeholder="Enter string of a and b here" />
          </div>
          
          
        <div className = "row my-5">
          <Tape input = {this.state.input} pointer = {this.state.pointer}/>
        </div>
          

        <div id="controls-container" class="row text-center btn-group">
            <div class="col-xs-1 mx-1">
              <button type="button" onClick = {this.reset} class="btn btn-warning btn-xs text-center">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-arrow-counterclockwise" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2v1z"/>
                <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466z"/>
              </svg>
              <br />
                Reset
              </button>
            </div>

            <div class="col-xs-1 mx-1">
              <button type="button" onClick = {this.trigger} class="btn btn-light text-center tm-btn-diagram tm-run">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-play" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" d="M10.804 8L5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z"/>
              </svg>
              <br />Run</button>
            </div>


            <div class="col-xs-2 col-xs-offset-4 text-center mx-1">
              <button type="button" onClick = {this.step} class="btn btn-primary text-center">
              <svg width="1.5em" height="1.5em" viewBox="0 0 16 16" class="bi bi-skip-end-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" d="M12 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z"/>
                <path d="M11.596 8.697l-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393z"/>
              </svg>
              <br />
                Step
              </button>
            </div>
            
        </div>


          {accept ? 
          <div className="alert alert-success my-5" role="alert">
            Success!
          </div> : <div /> 
          }

          {reject ? 
          <div className="alert alert-danger my-5" role="alert">
            Failure!
          </div> : <div /> 
          }


          <div className="accordion my-5" id="accordionExample">
            <div className="card">
              <div className="card-header" id="headingOne">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                    Check for Palindrome 
                  </button>
                </h2>
              </div>

              <div id="collapseOne" className="collapse show" aria-labelledby="headingOne" data-parent="#accordionExample">
                <div className="card-body">
                Checks whether the input string is a palindrome or not. Checks for both even and odd length palindromes. Strings containing only characters a and b are accepted. 
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingTwo">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                    Check divisibility by 3
                  </button>
                </h2>
              </div>
              <div id="collapseTwo" className="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
                <div className="card-body">
                  Checks whether the input number is divisible by 3. Accepts a non-negative integer. No need to input +/- sign. 
                </div>
              </div>
            </div>
            <div className="card">
              <div className="card-header" id="headingThree">
                <h2 className="mb-0">
                  <button className="btn btn-link btn-block text-left collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                    Check 3 equal length strings
                  </button>
                </h2>
              </div>
              <div id="collapseThree" className="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
                <div className="card-body">
                  Checks for the language a^n*b^n*c^n, where n{'>'}=1. Accepts only a, b and c as input charachters. Accepts only a's followed by b's followed by c's of the same length.
                </div>
              </div>
            </div>
          </div>
          
        </div>
          <br />
          <br />
        <Footer />
      </div>
    );
  }
  
}

export default App;
