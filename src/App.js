import "./App.css";
import { useState } from "react";
import Clarifai from "clarifai";
import Navigation from "./components/Navigation/Navigation";
import Rank from "./components/Rank/Rank";
import ImageInputForm from "./components/ImageInputForm/ImageInputForm";
import Particle from "./components/Particle/Particle";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";

const app = new Clarifai.App({
  apiKey: "YOUR API KEY HERE",
});

function App() {
  const [input, setInput] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [box, setBox] = useState({});
  const [route, setRoute] = useState("signIn");
  const [signedIn, setSignedIn] = useState(false);

  const onInputChange = (event) => {
    setInput(event.target.value);
  };

  const onButtonSubmit = () => {
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayFaceBox(calculateFaceLocation(response)))
      .catch((err) => console.log(err));

    setImageURL(input);
  };

  const onRouteChange = (route) => {
    if (route === "signOut") {
      setSignedIn(false);
    } else if (route === "home") {
      setSignedIn(true);
    }
    setRoute(route);
  };

  const calculateFaceLocation = (response) => {
    const face = response.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      left: face.left_col * width,
      top: face.top_row * height,
      right: width - face.right_col * width,
      bottom: height - face.bottom_row * height,
    };
  };

  const displayFaceBox = (box) => {
    setBox(box);
  };

  return (
    <div className="App">
      <Navigation isSignedIn={signedIn} onRouteChange={onRouteChange} />
      {route === "home" ? (
        <div>
          <Rank />
          <ImageInputForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition imageURL={imageURL} box={box} />
        </div>
      ) : route === "signIn" ? (
        <SignIn onRouteChange={onRouteChange} />
      ) : (
        <SignUp onRouteChange={onRouteChange} />
      )}
      <Particle />
    </div>
  );
}

export default App;
