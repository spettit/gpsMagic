import React, {useContext} from 'react';
import MapContext from '../../../MapContext'

function SideBar(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{minWidth: "200px"}}>
            <ul className="list-group">
            {state.trips.map((trip) => <li key={trip.id} className="list-group-item bg-dark text-white">{trip.data.name}</li>)}
            </ul>
            
        </div>
    );
}

export default SideBar;