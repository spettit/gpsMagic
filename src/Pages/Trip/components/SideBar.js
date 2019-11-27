import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function SideBar(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{minWidth: "200px"}}>
            {state.currentTracks.map(track => <li>{track.data.name}</li>)}
        </div>
    );
}

export default SideBar;