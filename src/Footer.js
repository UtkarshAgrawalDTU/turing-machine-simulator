import React, {Component} from 'react';
import "./Footer.css"


class Footer extends Component{

    render()
    {
        return(
            <div id="Footer">
                <div className="container">
                    <div className="row mt-5 pt-5">
                    <div className="col-lg-12 mb-4 text-center my-4">
                        <span className="fa-stack fa-2x icon">
                        <a href="https://www.linkedin.com/in/utkarsh-agrawal-622b5b16b/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-stack-2x icon-background"></i>
                            <i className="fab fa-linkedin-in fa-stack-1x"></i>
                        </a>
                        </span>

                        <span className="fa-stack fa-2x icon">
                        <a href="https://github.com/UtkarshAgrawalDTU/" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa fa-stack-2x icon-background"></i>
                            <i className="fab fa-github fa-stack-1x"></i>
                        </a>
                        </span>

                        <span className="icon fa-stack fa-2x icon">
                        <a href="mailto:agrawal.utkarsh8@gmail.com" target="_blank" rel="noopener noreferrer">
                            <i className="fa fa-stack-2x icon-background"></i>
                            <i className="far fa-envelope fa-stack-1x"></i>
                        </a>
                        </span>
                        <br />
                    </div>
                    <div className="col-lg-12 text-center">
                        <p className="copyright-text">
                        Handcrafted by me @<b>Utkarsh Agrawal</b>
                        </p>
                    </div>
                    </div>
                </div>
                </div>
        )
    }
}

export default Footer