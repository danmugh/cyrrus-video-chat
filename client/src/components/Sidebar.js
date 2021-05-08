import React, { useState, useEffect, useContext } from 'react';
import "./Sidebar.css";
import { CopyToClipboard } from 'react-copy-to-clipboard';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import {withStyles, makeStyles, TextField, Button} from "@material-ui/core";
import {Assignment, Phone, PhoneDisabled} from "@material-ui/icons";

import { SocketContext } from '../Context';

const Sidebar = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const [idToCall, setIdToCall] = useState('');
    const [sidebar, setSidebar] = useState(false);

    const classes = useStyles();

    const handleSidebar = () => {
        setSidebar(!sidebar)
    };

    // console.log('My ID ===>', me)

    return (
        <div className="sidebar__wrapper" >
            <div className="sidebar" >

                <div className={ sidebar ? 'sidebar__content active' : 'sidebar__content' } >

                    {
                        sidebar ?
                            <KeyboardArrowDownIcon onClick={ handleSidebar } style={{ fontSize: 60, cursor: 'pointer', color: '#0E0B0F' }} />
                            :
                            <KeyboardArrowUpIcon onClick={ handleSidebar } style={{ fontSize: 60, cursor: 'pointer', color: '#0E0B0F' }} />

                    }

                    <div className="sidebar__items" >
                        <div className="sidebar__item" >
                            <div className="icon__wrapper">
                                <div onClick={ handleSidebar } className="icon">
                                    <div className="icon__content"
                                         style={{ backgroundColor: '#e9d2ce' }} >
                                        <div
                                            className="info__button"
                                            style={{ left: '0px' }}
                                        >
                                        </div>
                                        <span
                                            style={{ color: 'rgb(0,0,0)', marginLeft: '42px' }} >Account Info
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <br />
                            <div className="info__input" >

                                <CssTextValidator
                                    variant="standard"
                                    className={classes.margin}
                                    fullWidth
                                    label="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                    name="email"
                                    value={name}
                                    autoComplete='off'
                                    InputProps={{
                                        className: classes.label,
                                    }}
                                />
                                <br/>

                                <CopyToClipboard text={me} >
                                    <button type="button" className="button" >
                                        <span className="button__text">COPY YOUR ID</span>
                                        <span className="button__icon">
                                            <Assignment fontSize="large" />
                                        </span>
                                    </button>
                                </CopyToClipboard>


                            </div>

                        </div>

                        <p className="copyright" style={{ opacity: `${sidebar ? '1' : '0'}`, transition: '200ms' }} >Made with <span >&#128153;</span> in Cyrrus Labs</p>

                        <div className="sidebar__item" >
                            <div className="icon__wrapper">
                                <div

                                    onClick={ callAccepted && !callEnded ? leaveCall : handleSidebar }

                                    className="icon">
                                    <div className="icon__content"
                                         style={{ backgroundColor: '#e9d2ce' }} >
                                        <div
                                            className="call__button"
                                            style={{ right: '0px' }}
                                        >
                                        </div>
                                        <span
                                            style={{ color: 'rgb(0,0,0)', marginLeft: '12px' }} >
                                            { callAccepted && !callEnded ? <p>Hang Up call</p> : <p>Make a call</p> }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <br />
                            <div className="call__input" >

                                <CssTextValidator
                                    variant="standard"
                                    className={classes.margin}
                                    fullWidth
                                    label="ID to call"
                                    onChange={(e) => setIdToCall(e.target.value)}
                                    name="email"
                                    value={idToCall}
                                    autoComplete='off'
                                    InputProps={{
                                        className: classes.label,
                                    }}
                                />

                                <br/>

                                { callAccepted && !callEnded ? (
                                    <button type="button" className="button" onClick={leaveCall} >
                                    <span onClick={ handleSidebar } className="button__icon">
                                        <PhoneDisabled fontSize="large" />
                                    </span>
                                        <span onClick={ handleSidebar } className="button__text">HANG UP</span>
                                    </button>
                                ) : (
                                    <button type="button"
                                            onClick={() => callUser(idToCall)}
                                            className="button">
                                        <span
                                            onClick={ handleSidebar }
                                            className="button__icon">
                                            <Phone fontSize="large" />
                                        </span>
                                        <span onClick={ handleSidebar } className="button__text">CALL</span>
                                    </button>
                                )}

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CssTextValidator = withStyles({
    root: {
        '& label': {
            color: '#e9d2ce',
            fontFamily: 'Montserrat',
            fontSize: '17px',
            fontWeight: 'bold',
        },

        '& label.Mui-focused': {
            color: '#e9d2ce',
        },
        '& .MuiInput-underline::before': {
            borderColor: '#e9d2ce',
            borderWidth: 2,
        },
        '& .MuiInput-underline::after': {
            // borderColor: '#c1291f',
            borderColor: '#e9d2ce',
            borderWidth: 2,
        }
    },
})(TextField);

const useStyles = makeStyles((theme) => ({

    // '& .MuiButton-fullWidth ' : {
    //     width: '100px'
    // },

    paper: {
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        borderRadius: '10px',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(4, 4, 3),
    },

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        "&:focus":{
            outline: "none"
        }
    },

    margin: {
        margin: theme.spacing(0),
    },
    label : {
        fontFamily: 'Montserrat',
        fontSize: '17px',
        fontWeight: 'bold',
        color: '#e9d2ce',

    },
    submit: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: theme.spacing(1),
        color: '#e9d2ce',
        fontFamily: 'Marcellus',
        fontSize: '15px',
        fontWeight: '300',
        // width: '170px'

    }


}));

export default Sidebar;
