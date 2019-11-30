import React from "react";
import moment from "moment";

function Meta(props) {
  if (props.points.length < 1) {
    return <div>No Data</div>;
  }

  return (
    <div>
      <div>Start: {moment(props.points[0].timestamp).format("HH:mm:ss")}</div>
      <div>
        End:{" "}
        {moment(props.points[props.points.length - 1].timestamp).format(
          "HH:mm:ss"
        )}
      </div>
      <div>count: {props.points.length}</div>
      <div>total distance {props.totalDistance}</div>
    </div>
  );
}

export default Meta;
