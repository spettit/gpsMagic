import React, { useContext } from "react";
import MapContext from "../../MapContext";

function ImageGallery() {
  const { state } = useContext(MapContext);
  return state.images.map(image => {
    return (
      <img
        key={image.data.imageUrl}
        src={image.data.imageUrl}
        // width="100px"
        height="100px"
        alt={image.data.name}
      />
    );
  });
}

export default ImageGallery;
