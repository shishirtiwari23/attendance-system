import "./Registration.css";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const Registration = () => {
  const videoRef = useRef(null);
  const snapshotRef = useRef(null);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [standard, setStandard] = useState("");
  const [rollNo, setRollNo] = useState("");
  const [id, setId] = useState("ABX13341");

  function getVideo() {
    window.navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.error(err));
  }

  function takeSnapshot() {
    const dimension = { width: 400, height: 400 / (16 / 9) };
    let video = videoRef.current;
    let snapshot = snapshotRef.current;
    snapshot.width = dimension.width;
    snapshot.height = dimension.height;

    let context = snapshot.getContext("2d");
    context.drawImage(video, 0, 0, dimension.width, dimension.height);
  }
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <div className="registration">
      <form className="registration-form">
        <TextField
          id="outlined-basic"
          value={id}
          onChnage={(e) => setId(e.target.value)}
          label="Id"
          disabled
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={name}
          onChnage={(e) => setName(e.target.value)}
          label="Name"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={rollNo}
          onChnage={(e) => setRollNo(e.target.value)}
          label="Roll No"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={standard}
          onChnage={(e) => setStandard(e.target.value)}
          label="Standard"
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={age}
          onChnage={(e) => setAge(e.target.value)}
          label="Age"
          variant="outlined"
        />
        <Button onClick={takeSnapshot}>Take a Picture</Button>
      </form>
      <div className="camera">
        <video ref={videoRef}></video>
        <div className="snapshot">
          <canvas ref={snapshotRef}></canvas>
        </div>
      </div>
    </div>
  );
};

export default Registration;
