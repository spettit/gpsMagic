import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function Photo(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{margin: "50px"}}>
            {props.currentPhoto.type==="image" && <img src={props.currentPhoto && props.currentPhoto.url} width="200px" alt={props.currentPhoto && props.currentPhoto.description}/>}
            {props.currentPhoto.type==="movie" && <video src={props.currentPhoto && props.currentPhoto.url} width="200px" alt={props.currentPhoto && props.currentPhoto.description} autoPlay muted/>}
        </div>
    );
}

export default Photo;