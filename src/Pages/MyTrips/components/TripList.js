import React, { useContext } from "react";
import MapContext from "../../../MapContext";
import { Link } from "@reach/router";

function TripList(props) {
  const { state } = useContext(MapContext);

  function renderList() {
    if (!state.userProfile || !state.userProfile.usersTrips){
      return null
    }
    return state.userProfile.usersTrips.map(trip => {
      return (
        <div key={trip.id}>
          <Link to={`/trip/${trip.slug}/edit`}>
            <img
              src={trip.thumbnail}
              height="100"
              width="100"
              alt="trip"
              style={{ borderRadius: "10%" }}
            />
            {trip.name}
          </Link>
        </div>
      );
    });
  }

  return <div className="container">{renderList()}</div>;
}

export default TripList;
