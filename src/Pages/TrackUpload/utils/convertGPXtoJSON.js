import $ from "jquery";
// const $ = window.jquery
// import _ from 'lodash';
// import moment from 'moment';



const convertGPXtoJSON = gpx => {
  const cleanGpx = gpx;
  //.replace(/:/g, '&');
  // console.log(cleanGpx);
  const points = [];
  let name = "";
  const xml = $.parseXML(cleanGpx);
  $(xml)
    .find("trk")
    .each(function() {
      name = $(this)
        .children("name")
        .text();
    });

  $(xml)
    .find("trkpt")
    .each(function() {
      const lat = $(this).attr("lat");
      const lon = $(this).attr("lon");
      const date = $(this)
        .children("time")
        .text();
      const timestamp = new Date(date).getTime();
      const elevation = $(this)
        .children("ele")
        .text();
      points.push({ lat: Number(lat), lng: Number(lon), timestamp, altitude: elevation });
    });
  const StartTime = points[0].timestamp;
  return { points, name, StartTime };
};

export default convertGPXtoJSON;