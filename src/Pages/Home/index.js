import React, { useEffect, useContext  } from 'react'
import Map from './components/Map'
import MapContext from '../../MapContext'
import TripList from './components/TripList'

let Home = (props) => {
    const { dispatch } = useContext(MapContext)
    useEffect(() => dispatch({type: "setType", payload: props.type}))
    return (
        <div>
            <div className="Top-spacer"></div>
            <Map />{props.type}
            <TripList />
        </div>

    )

}

export default Home