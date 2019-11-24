import React from 'react';

function VideoPlayer(props) {
    return (
        <div>
            <video id="vid" width="320" height="240">
                <source src="https://firebasestorage.googleapis.com/v0/b/gpxmagic.appspot.com/o/video%2FGOPR0504.mp4?alt=media&token=ec408693-efa6-4bab-ac73-510588415482"></source>
            </video>
            <button onClick={() => document.getElementById("vid").play()}>Play</button>
            <button onClick={() => document.getElementById("vid").pause()}>Stop</button>
        </div>
    );
}

export default VideoPlayer;