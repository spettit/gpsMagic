import React, { useContext } from "react";
import MapContext from "../../../MapContext";
import { Link } from '@reach/router'

function TripList(props) {
  const { state } = useContext(MapContext);

  function renderList() {
    console.log("render list");
    return state.trips.map(trip => {
      return (
        <div key={trip.id}>
            <Link to={`/trip/${trip.data.slug}`}>
            <img src={trip.data.image} height="100" width="100" alt="trip" style={{borderRadius: "10%"}}/>
          {trip.data.name}

            </Link>
          
        </div>
      );
    });
  }

  return (<div className="container">
      {renderList()}
  </div>);
}

export default TripList;