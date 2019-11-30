import React, { useEffect, useContext  } from 'react'
import Map from './components/Map'
import MapContext from '../../MapContext'
import SideBar from './components/SideBar'
import { getAllTrips } from '../../firebase/firestore'

let Home = (props) => {
    
    const { state, dispatch } = useContext(MapContext)
    
    useEffect(() => dispatch({type: "loading"}), [dispatch])
    useEffect(() => getAllTrips(dispatch), [dispatch]);

    return (
        <div>
            <div className="top-spacer"></div>
            <div style={{display: "flex"}}>
                <SideBar />
                {!state.loading && <Map />}
            </div>
        </div>

    )

}

export default Home