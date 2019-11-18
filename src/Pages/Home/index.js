import React, { useEffect, useContext  } from 'react'
import Map from '../../Layout/Map'
import MapContext from '../../MapContext'

let Home = (props) => {
    const { dispatch } = useContext(MapContext)
    useEffect(() => dispatch({type: "setType", payload: props.type}))
    return (
        <div>
            <Map />{props.type}
        </div>

    )

}

export default Home