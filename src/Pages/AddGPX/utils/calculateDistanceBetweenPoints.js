const google = window.google

const calcDistanceBetweenPoints = (pointA, pointB) => {
  const p1 = new google.maps.LatLng(pointA);
  const p2 = new google.maps.LatLng(pointB);
  // console.log(google.maps.geometry.spherical)
  
  const distance = google.maps.geometry.spherical.computeDistanceBetween(
    p1,
    p2
  );
 
  return distance.toFixed(0);
};

export default calcDistanceBetweenPoints;
