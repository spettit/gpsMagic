import React, { useContext } from "react";
import MapContext from "../../../MapContext";
import { Link } from "@reach/router";

function TripList(props) {
  const { state } = useContext(MapContext);

  function renderList() {
    return state.trips.map(trip => {
      return (
        <div key={trip.id}>
          <Link to={`/trip/${trip.data.slug}`}>
            <img
              src={trip.data.thumbnail}
              height="100"
              width="100"
              alt="trip"
              style={{ borderRadius: "10%" }}
            />
            {trip.data.name}
          </Link>
        </div>
      );
    });
  }

  return (
    <div className="container">
      <h2>Top Trips</h2>
      {renderList()}
    </div>
  );
}

export default TripList;
