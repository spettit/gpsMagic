import React, { useEffect, useContext  } from 'react'
import Map from './components/Map'
import MapContext from '../../MapContext'
import TripList from './components/TripList'
import SideBar from './components/SideBar'

let Home = (props) => {
    const { dispatch } = useContext(MapContext)
    useEffect(() => dispatch({type: "setType", payload: props.type}))
    return (
        <div>
            <div className="Top-spacer"></div>
            <div style={{display: "flex"}}>
                <SideBar />
                <Map />{props.type}
            </div>
            
            {/* <div className="container">
            <TripList />
            </div> */}
            
        </div>

    )

}

export default Home