import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function Photo(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{margin: "50px"}}>
            <img src={state.currentPhoto && state.currentPhoto.url} width="200px" alt={state.currentPhoto && state.currentPhoto.description}/>
        </div>
    );
}

export default Photo;