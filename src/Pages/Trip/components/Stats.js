import React, { useContext } from 'react'
import MapContext from '../../../MapContext'

const Stats = () => {
    const { state } = useContext(MapContext)
    return (
        <div>
            <h1>Stats</h1>
            <p>{state.currentTrip.name}</p>
            <p>{state.currentTrip.type}</p>
            <p>{state.currentTrip.date && state.currentTrip.date.toString()}</p>
            {state.currentTrip.participants && state.currentTrip.participants.map((person) => {
                return(<p key={person}>{person}</p>)
            })}
        </div>
    )
}

export default Stats