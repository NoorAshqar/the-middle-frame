import React from 'react';
import './Footer.css';

const Footer=()=>{
    return(
        <div className="main-footer">
            <div className="container">
                <div className="row">
                    {/* col1 */}
                    <div className="col">
                        <h4>About</h4>
                        <span>HotelCom is a task for the middle frame</span> 
                    </div>
                    {/* col2 */}
                    <div className="col">
                        <h4>Contact Us </h4>
                        <ul className="list-unstyled"></ul>
                        <li>tell me what you think plz</li>
                    </div>
                    
                    {/* col3 */}
                    <div className="col">
                        <h4>Noor Ashqar</h4>
                    </div>
                    
                </div>
            

                <hr />
                <div>
                    <span className="col">
                        &copy;{new Date().getFullYear()} HotelCom | All right reserved by none.... 
                    </span>
                </div>
                
            </div>
        </div>
    )
}
export default Footer;