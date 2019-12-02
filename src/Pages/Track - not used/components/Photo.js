import React from 'react';


function Photo(props) {
    return (
        <div style={{margin: "50px", minWidth: "300px"}}>
            {props.currentPhoto.type==="image" && <div style={{
                width:"300px", 
                height:"200px", 
                backgroundImage: `url("${props.currentPhoto.url}")`,
                backgroundRepeat: "no-repeat", 
                // backgroundAttachment: "fixed", 
                backgroundPosition: "center",
                backgroundSize: "cover",
                display: "flex",
                flexDirection: "row",
                justifyContent: "flex-end",
                alignItems: "flex-end",
                backgroundColor: "lightgray",
                // alignContent: "center",
                // justifyItems: "center",

                
                }}>
            </div>}
            {props.currentPhoto.type==="movie" && <video src={props.currentPhoto && props.currentPhoto.url} width="300px" height="200px" alt={props.currentPhoto && props.currentPhoto.description} autoPlay muted/>}
            {props.currentPhoto.type==="youtube" && <iframe title="youtube" src={props.currentPhoto && props.currentPhoto.url+'?rel=0;&autoplay=1'} frameBorder="0" width="300" height="200" allow="autoplay" aria-label="label"></iframe>}
        </div>
    );
}

export default Photo;