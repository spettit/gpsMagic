import React, { useContext } from 'react'
import MapContext from '../../../MapContext'

const Stats = () => {
    const { state } = useContext(MapContext)
    return (
        <div>
            {/* <h3>{state.currentTrip.name}</h3> */}
            <span></span>
            <span>{state.currentTrip.name}</span>
            <span>-</span>
            <span>{state.currentTrip.type}</span>
            {/* <span>{state.currentTrip.date && state.currentTrip.date.toString()}</span> */}
            {/* {state.currentTrip.participants && state.currentTrip.participants.map((person) => {
                return(<p key={person}>{person}</span>) */}
            {/* })} */}
        </div>
    )
}

export default Stats