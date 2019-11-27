import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function SideBar(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{minWidth: "200px"}}>
            SideBar
            {state.currentTracks.map(track => <div>{track.name}</div>)}
        </div>
    );
}

export default SideBar;