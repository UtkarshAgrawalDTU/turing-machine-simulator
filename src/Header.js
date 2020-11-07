import React, { Component } from "react";
import './Header.css'

class Header extends Component {
  render() {
    return (

      <div className="Header mb-5">
        
        <nav className="navbar navbar-expand-md navbar-light bg-white fixed-top py-4">
            <div className="container-fluid">
                <h1 className = "link logo mx-auto">Turing Machine Simulator</h1>
            </div>
          
        
        </nav>
        <br></br>
        <br></br>
        <br></br>
        <br></br>     
        <br />
        <br />
      </div>
    );
  }
}

export default Header;