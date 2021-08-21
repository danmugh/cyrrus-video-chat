import React, {useState, useEffect, useContext} from 'react';
import "./Sidebar_Small.css";
import {Assignment, Phone, PhoneDisabled} from "@material-ui/icons";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import {CopyToClipboard} from "react-copy-to-clipboard";
import {makeStyles, TextField, withStyles} from "@material-ui/core";
import {SocketContext} from "../Context";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring/web.cjs';

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

const Sidebar_Small = () => {
    const { me, callAccepted, name, setName, callEnded, leaveCall, callUser } = useContext(SocketContext);
    const classes = useStyles();

    const [idToCall, setIdToCall] = useState('');
    const [open, setOpen] = React.useState(false);
    const [infos, setInfos] = React.useState(false);
    const [call, setCall] = React.useState(false);

    const handleOpenInfos = () => {
        setOpen(true);
        setInfos(true)
    };

    const handleOpenCall = () => {
        setOpen(true);
        setCall(true)
    };

    const handleClose = () => {
        setOpen(false);
        setCall(false);
        setInfos(false);
    };

    return (
        <>
            <div className="reload__wrapper__small">
                <div className="reload__small">
                    <p>Please, reload the page!</p>
                </div>
            </div>
            <div className="sidebar__small__wrapper" >
                <div className="sidebar__small" >
                    {/*<p>Hey Guys, Jesus is Lord</p>*/}

                    <span onClick={handleOpenInfos} className="button__small__icon">
                        <AccountCircleIcon
                            style={{ color: 'rgba(233,210,206,1)' }}
                            fontSize="large" />
                        <p>Infos</p>
                    </span>

                    <span onClick={ callAccepted && !callEnded ? leaveCall : handleOpenCall } className="button__small__icon">
                       <Phone
                           style={{ color: 'rgba(233,210,206,1)' }}
                           fontSize="large" />
                        { callAccepted && !callEnded ? <p>HangUp</p> : <p>Call</p> }
                    </span>
                </div>

                <Modal
                    aria-labelledby="spring-modal-title"
                    aria-describedby="spring-modal-description"
                    className={classes.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >

                    <div className="removeOutline" >
                        <Fade in={open}>

                            {
                                infos && !call &&
                                (
                                    <div className={classes.paper}>
                                        {/*<h2 id="spring-modal-title">Spring modal</h2>*/}
                                        {/*<p id="spring-modal-description">react-spring animates me.</p>*/}

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
                                            <button type="button" className="btn" onClick={handleClose}  >
                                                <span className="btn__small__text">COPY YOUR ID</span>
                                                <span className="btn__icon">
                                                        <Assignment fontSize="large" />
                                                    </span>
                                            </button>
                                        </CopyToClipboard>

                                    </div>
                                )
                            }

                            {
                                call & !infos &&
                                (
                                    <div className={classes.paper} >
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
                                            <button type="button" className="btn" onClick={leaveCall} >
                                                    <span className="button__icon">
                                                    <PhoneDisabled fontSize="large" />
                                                    </span>
                                                <span className="button__text">HANG UP</span>
                                            </button>
                                        ) : (
                                            <button type="button"
                                                    onClick={() => callUser(idToCall)}
                                                    className="btn">
                                                        <span
                                                            onClick={ handleClose }
                                                            className="button__icon">
                                                                <Phone fontSize="large" />
                                                        </span>
                                                <span onClick={ handleClose } className="button__text">CALL</span>
                                            </button>
                                        )}
                                    </div>
                                )
                            }


                        </Fade>
                    </div>


                </Modal>


            </div>
        </>
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
        backgroundColor: 'rgba(252,240,237,0.8)',
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

    },
    submit: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        margin: theme.spacing(1),
        color: '#fff',
        fontFamily: 'Marcellus',
        fontSize: '15px',
        fontWeight: '300',
        // width: '170px'

    }


}));

export default Sidebar_Small;
