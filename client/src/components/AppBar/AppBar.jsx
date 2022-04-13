import { Toolbar, AppBar, IconButton, Typography, Button } from '@material-ui/core';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';
import logo from './great2.png'
import React from "react";
import "./appBar.css";
import 'date-fns';

class AppBarr extends React.Component {
    constructor() {
        super()
        this.state = {
            nav: null
        }
    }
    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        var navbar = document.getElementById("navbar");
        var sticky = navbar.offsetTop;

        if (window.pageYOffset > sticky) {
            if (!this.state.nav) {
                this.setState({ nav: true });
            }
        } else {
            if (this.state.nav) {
                this.setState({ nav: false });
            }
        }

    }

    handleLoginClick = (e) => {
        e.preventDefault()
        fetch("http://localhost:5000/signout")
            .then(() => {
                localStorage.removeItem("jwt-auth")
                localStorage.removeItem("current-user")
                window.location.reload()
            }).catch()
    }
    render() {
        return (
            <div id="navbar" className={`${this.state.nav && 'sticky' }`}>
                <div className="NavBar">
                    <AppBar position="static">
                        <Toolbar className="toolBar">
                            <Link to='/'>
                                <Typography className="typography mys center" variant="h4">
                                    <img alt='HotelCom' src={logo} />
                                    <Button color="inherit">
                                    Homepage
                                    </Button>
                                    
                                </Typography>
                            </Link>
                            {
                                this.props.currentUser ?
                                    <div >
                                        <Button color="inherit" onClick={this.handleLoginClick}>
                                            Signout
                                    </Button>
                                    </div>

                                    :
                                    <div >
                                        <Button >
                                            <Link to='/signin' className="user-sign">
                                                Sign in
                                         </Link>
                                        </Button>
                                        <Button >
                                            <Link to='/signup' className="user-sign">
                                                Sign up
                                         </Link>
                                        </Button>
                                    </div>
                            }
                        </Toolbar>
                    </AppBar>
                </div>
            </div>
        )

    }
}

export default AppBarr;
