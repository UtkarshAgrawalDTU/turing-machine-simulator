import {React, Component} from "react"
import "./Rectangle.css"

class Tape extends Component
{

    constructor(props)
    {
        super(props);
    }
    
  render(){
      var rect = [];
      var j = this.props.pointer;
      for(var i = 410; i>= -40; i-=50)
      {
          var text = ""
          if(this.props.input.length == 0 || j<0 || j >= this.props.input.length)
            text = ""
        
        else
            text = this.props.input[j]

        rect.push({
                text : text,
                translate : String("translate("+i+")")
        })
        j--;
      }

      j = this.props.pointer + 1;

      for(var i = 460; i <= 900; i+=50)
      {
        var text = ""
        if(this.props.input.length == 0 || j<0 || j >= this.props.input.length)
          text = ""
      
          else
            text = this.props.input[j]
        rect.push({
                text : text,
                translate : String("translate("+i+")")
        })
        j++;
      }

      const rectObj = rect.map(item => <g class="tape-cell" transform= {item.translate}>
                                    <rect className = "boxStyle" width="50" height="50"></rect>
                                    <text x="25" y="33">{item.text}</text>
                                </g>);



    return (
            <svg class="tm-tape" width="95%" viewBox="0 0 870 70">
                <g class="wrapper" transform="translate(0 10)">
                    {rectObj}
                </g>
                <rect id="tape-head" width="60" height="60" x="405" y="5"></rect>
            </svg>
    );
  }
}

export default Tape;



