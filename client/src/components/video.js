import React, { useContext } from 'react';
import "./video.css";
import { SocketContext } from '../Context';


const Video = () => {
    const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } = useContext(SocketContext);

    return (
        <div className="video__wrapper" >

            {callAccepted && !callEnded && (
                <>
                    <div className="video__stream" >
                        <video playsInline ref={userVideo} autoPlay className="video__container" />
                        <div className="overlay__wrapper">
                            <h4>{call.name || 'Name'}</h4>

                        </div>
                    </div>
                </>
            )}

            {stream && (
                <>
                    <div className="video__stream" >
                        {/*<h4>{name || 'Name'}</h4>*/}
                        <video playsInline muted ref={myVideo} autoPlay className="video__container" />

                        <div className="overlay__wrapper">
                            <h4>{name || 'Name'}</h4>

                            {/*<div className="overlay">*/}
                            {/*    <h4>{name || 'Name'}</h4>*/}
                            {/*</div>*/}
                        </div>

                    </div>

                </>

            )}

            {/*{callAccepted && !callEnded && (*/}
            {/*    <div className="video__stream" >*/}
            {/*        <video playsInline ref={userVideo} autoPlay className="video__container" />*/}
            {/*        <div className="overlay__wrapper">*/}
            {/*            <h4>{call.name || 'Name'}</h4>*/}

            {/*        </div>*/}
            {/*    </div>*/}
            {/*)}*/}

        </div>
    );
};

export default Video;
