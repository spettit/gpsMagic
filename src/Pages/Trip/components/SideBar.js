import React, {useContext} from 'react';
import MapContext from '../../../MapContext'
import { getCurrentTrackById } from '../../../firebase/firestore'

function SideBar(props) {
    const { state, dispatch } = useContext(MapContext)

    function setTrack(id) {
        props.setMode(1)
        getCurrentTrackById(id, dispatch)
    }

    return (
        <div style={{minWidth: "200px"}}>
            <ul className="list-group">
            {state.currentTracks && state.currentTracks.map(track => <li 
            key={track.id} 
            className="list-group-item bg-dark text-white mousepointer"
            onClick={() => setTrack(track.id)}
            >{track.data.name}</li>)}
            </ul>
            
        </div>
    );
}

export default SideBar;