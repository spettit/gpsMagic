const sortPointsByTimestamp = (points) => {
    points.sort((a,b) => {return (a.timestamp > b.timestamp) ? 1 : ((b.timestamp > a.timestamp) ? -1 : 0);});
    console.log('sorted')
    return points;
}

export default sortPointsByTimestamp;