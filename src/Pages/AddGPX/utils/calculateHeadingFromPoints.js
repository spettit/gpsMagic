const google = window.google

const calculateHeadingFromPoints = (pointA, pointB) => {
  const p1 = new google.maps.LatLng(pointA);
  const p2 = new google.maps.LatLng(pointB);
  const gheading = google.maps.geometry.spherical.computeHeading(
    p1,
    p2
  );
  const heading = gheading<0 ? 360+gheading : gheading;
  return heading.toFixed(2);
};

export default calculateHeadingFromPoints;
