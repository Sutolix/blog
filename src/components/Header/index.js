import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import './header.css'

class Header extends Component {

    render() {
        return (
                <header id="main-header">
                    <div className="header-content">
                    <Link to="/dashboard"><img src={require('../../assets/settings.png')} className="settings" alt="Settings"/></Link>
                    <Link to="/"><h1>DEV Forum</h1></Link>
                    <Link to="/notifications"><img src={require('../../assets/notificationOFF.png')} className="notifications" alt="Notifications"/></Link>
                    </div>

                    <nav className="shadow">
                        <ul>
                            <li>Home</li>
                        </ul>
                    </nav>
                </header>
        );
    }
}

export default Header;
