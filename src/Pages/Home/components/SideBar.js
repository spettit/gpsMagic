import React, {useContext} from 'react';
import { Link } from '@reach/router'
import MapContext from '../../../MapContext'

function SideBar(props) {
    const { state } = useContext(MapContext)
    return (
        <div style={{minWidth: "200px"}}>
            <ul className="list-group">
                {state.trips.map((trip) => <Link key={trip.id} to={`trip/${trip.data.slug}`}><li className="list-group-item bg-dark text-white list-group-item-action">{trip.data.name}</li></Link>)}
            </ul>
            
        </div>
    );
}

export default SideBar;