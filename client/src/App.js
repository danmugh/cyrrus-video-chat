import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Nav from "./components/Nav";
import Sidebar from "./components/Sidebar";
import Video from "./components/video";
import Sidebar_Small from "./components/Sidebar_Small";

const useStyles = makeStyles((theme) => ({

    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100vw',
    },
}));

const App = () => {
    const classes = useStyles();

    let sidebar = (
        <Sidebar />
    )

    if ( isMobile() ) {
        sidebar = (
            <Sidebar_Small />
        )
    }

    return (
        <div className={classes.wrapper}>

            <Nav />

            { sidebar }

            <Video />

        </div>
    );
};

function isMobile() {
    const toMatch = [
        /Android/i,
        /webOS/i,
        /iPhone/i,
        /iPod/i,
        /BlackBerry/i,
        /Windows Phone/i
    ];

    return toMatch.some((toMatchItem) => {
        return navigator.userAgent.match(toMatchItem);
    });
}

export default App;
