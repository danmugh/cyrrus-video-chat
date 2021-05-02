import React, { useState, useContext } from 'react';
import "./Navbar.css";
import {Phone} from "@material-ui/icons";
import { SocketContext } from '../Context';

const Nav = () => {
    const { answerCall, call, callAccepted } = useContext(SocketContext);
    const [notification, setNotification] = useState(false);

    // if ( call.isReceivingCall && !callAccepted  ) {
    //     setNotification(true)
    //
    //     console.log('New Notification')
    // }

    // if ( callAccepted ) {
    //     setNotification(false)
    // }
    //
    // const handleNotification = () => {
    //     setNotification(!notification)
    // };

    return (
        <div className="nav__wrapper" >

            <div
                className={ call.isReceivingCall && !callAccepted ? 'nav active' : 'nav ' } >
                <h3>CYRRUS VIDEO CHAT</h3>
            </div>
            <div
                className="notification__wrapper">
                <div className={ call.isReceivingCall && !callAccepted ? 'notification active' : 'notification' } >

                    <div onClick={ answerCall } className="call" >
                        <div className="call-phone">
                            <div className="call-phone__circle"></div>
                            <div className="call-phone__circle-fill"></div>
                            <div className="call-phone__circle-img">
                                <span className="icon-phone" >
                                     <Phone fontSize="large" />
                                </span>

                            </div>
                        </div>
                    </div>

                    <h3>{call.name} calling you</h3>
                </div>
            </div>

        </div>
    );
};

export default Nav;
