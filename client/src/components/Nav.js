import React, {useState, useContext, useEffect} from 'react';
import "./Navbar.css";
import "./Sidebar.css";
import {Assignment, Phone} from "@material-ui/icons";
import { SocketContext } from '../Context';
import {withStyles, makeStyles, TextField, Button} from "@material-ui/core";

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';
import {CopyToClipboard} from "react-copy-to-clipboard";

const Fade = React.forwardRef(function Fade(props, ref) {
    const { in: open, children, onEnter, onExited, ...other } = props;
    const style = useSpring({
        from: { opacity: 0 },
        to: { opacity: open ? 1 : 0 },
        onStart: () => {
            if (open && onEnter) {
                onEnter();
            }
        },
        onRest: () => {
            if (!open && onExited) {
                onExited();
            }
        },
    });

    return (
        <animated.div ref={ref} style={style} {...other}>
            {children}
        </animated.div>
    );
});

const Nav = () => {
    const classes = useStyles();
    const { answerCall, call, callAccepted, me, name, setName } = useContext(SocketContext);
    const [notification, setNotification] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    const handleModal = () => {
        setOpenModal(true);
    };

    const handleClose = () => {
        setOpenModal(false);
    };

    useEffect(() => {
        const timer = setTimeout(() => handleModal(), 2500);
        return () => clearTimeout(timer);
    }, []);

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

            <Modal
                aria-labelledby="spring-modal-title"
                aria-describedby="spring-modal-description"
                className={classes.modal}
                open={openModal}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >

                <div className="removeOutline" >
                    <Fade in={openModal}>
                        <div className={classes.paper} >
                            <div className="info__modal" >

                                <div className="info__modal_title" >
                                    <h4> Account Info</h4>
                                </div>
                                <br/>
                                <CssTextValidator
                                    variant="standard"
                                    className={classes.margin}
                                    fullWidth
                                    label="Enter your name"
                                    onChange={(e) => setName(e.target.value)}
                                    name="name"
                                    value={name}
                                    autoComplete='off'
                                    InputProps={{
                                        className: classes.label,
                                    }}
                                />
                                <br/>

                                <CopyToClipboard text={me} onClick={ handleClose } >
                                    <button type="button" className="button" >
                                        <span className="button__text">COPY YOUR ID</span>
                                        <span className="button__icon">
                                           <Assignment fontSize="large" />
                                        </span>
                                    </button>
                                </CopyToClipboard>
                                <br/>
                                <div className="info__modal_description" >
                                    <p>Copy the ID and send it to the<br/> person who will call you.</p>
                                    <p>Or ask the person you want to <br/>call his ID and make the call.</p>
                                </div>

                            </div>

                        </div>

                    </Fade>
                </div>
            </Modal>

        </div>
    );
};

const CssTextValidator = withStyles({
    root: {
        '& label': {
            color: '#0E0B0F',
            fontFamily: 'Montserrat',
            fontSize: '17px',
            fontWeight: 'bold',
        },

        '& label.Mui-focused': {
            color: '#0E0B0F',
        },
        '& .MuiInput-underline::before': {
            borderColor: '#0E0B0F',
            borderWidth: 2,
        },
        '& .MuiInput-underline::after': {
            // borderColor: '#c1291f',
            borderColor: '#0E0B0F',
            borderWidth: 2,
        }
    },
})(TextField);

const useStyles = makeStyles((theme) => ({

    paper: {
        backgroundColor: 'rgba(252,235,232,0.8)',
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
        color: '#0E0B0F',
    }

}));

export default Nav;
