import React from "react";
import "./FaceRecognition.css";

const FaceRecognition = ({ imageURL, box }) => {
  return (
    <div className="center">
      <div className="absolute mt2">
        <img id="inputImage" src={imageURL} width="500px" height="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.top,
            right: box.right,
            bottom: box.bottom,
            left: box.left,
          }}
        ></div>
      </div>
    </div>
  );
};

export default FaceRecognition;
