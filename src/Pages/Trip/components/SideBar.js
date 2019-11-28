import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function SideBar(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{minWidth: "200px"}}>
            <ul className="list-group">
            {state.currentTracks && state.currentTracks.map(track => <li key={track.id} className="list-group-item bg-dark text-white mousepointer">{track.data.name}</li>)}
            </ul>
            
        </div>
    );
}

export default SideBar;