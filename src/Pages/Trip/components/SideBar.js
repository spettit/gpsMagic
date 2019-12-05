import React, { useContext } from 'react';
import { Link } from '@reach/router'
import MapContext from '../../../MapContext'
import { getCurrentTrackById } from '../../../firebase/firestore'

function SideBar(props) {
    const { state, dispatch } = useContext(MapContext)

    function setTrack(id) {
        props.setMode(1)
        dispatch({type: "loading"})
        getCurrentTrackById(id, dispatch)
    }

    return (
        <div style={{minWidth: "200px"}}>
            <ul className="list-group">
            {state.currentTrip && state.currentTrip.tracks && state.currentTrip.tracks.length > 0 && state.currentTrip.tracks.map(track => <li 
            key={track.id} 
            className="list-group-item bg-dark text-white mousepointer"
            onClick={() => setTrack(track.id)}
            >{track.name}</li>)}
            </ul>
            <Link to={`/trip/${state.currentTrip.slug}/edit`}>Edit</Link>
        </div>
    );
}

export default SideBar;