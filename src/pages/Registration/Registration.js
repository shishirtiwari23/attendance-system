import "./Registration.css";
import { Button, TextField } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { ConfirmationModal } from "../../components";

const Registration = () => {
  const videoRef = useRef(null);
  const snapshotRef = useRef(null);
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [standard, setStandard] = useState(0);
  const [rollNo, setRollNo] = useState("");
  const [uid, setUid] = useState(Date.now());
  const [section, setSection] = useState("");
  const [takingAnotherSnapshot, setTakingAnotherSnapshot] = useState(true);
  const [isModalRequested, setIsModalRequested] = useState(false);

  function getVideo() {
    window.navigator.mediaDevices
      .getUserMedia({ video: { width: 1920, height: 1080 } })
      .then((stream) => {
        let video = videoRef.current;
        video.srcObject = stream;
        video.play();
      })
      .catch((err) => console.log(err));
  }

  function checkData() {
    const data = new FormData();
    // data.append(
    //   "data",
    //   JSON.stringify({
    //     name,
    //     age,
    //     standard,
    //     rollNo,
    //     uid,
    //     section,
    //   })
    // );
    data.append("uid", uid);
    data.append("name", name);
    data.append("section", section);
    data.append("age", age);
    data.append("standard", standard);
    data.append("rollNo", rollNo);
    data.append("image", image);
    axios
      .post("http://localhost:8080/register", data)
      .then((res) => {
        return res;
      })
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    axios
      .get("http://localhost:8080/data")
      .then((res) => {
        console.log(res);
        return res;
      })
      .then((data) => {
        console.log({ data });
      })
      .catch((err) => console.log(err));
  }

  function takeSnapshot() {
    const dimension = { width: 400, height: 400 / (16 / 9) };
    let video = videoRef.current;
    let snapshot = snapshotRef.current;
    snapshot.width = dimension.width;
    snapshot.height = dimension.height;

    let context = snapshot.getContext("2d");
    context.drawImage(video, 0, 0, dimension.width, dimension.height);
    setImage(snapshotRef.current.toDataURL());
    setTakingAnotherSnapshot(false);
  }

  function takeAnotherHandler() {
    setTakingAnotherSnapshot(true);
  }
  useEffect(() => {
    console.log(snapshotRef);
  });
  function submitHandler(e) {
    e.preventDefault();
    if (!takingAnotherSnapshot) {
      checkData();
      setIsModalRequested(true);
      setTakingAnotherSnapshot(true);
      setTimeout(() => setIsModalRequested(false), 3000);
    }
  }
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  return (
    <form onSubmit={submitHandler} className="registration">
      <div className="registration-form">
        <TextField
          id="outlined-basic"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          label="Id"
          required
          disabled
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={name}
          onChange={(e) => setName(e.target.value)}
          label="Name"
          required
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={rollNo}
          onChange={(e) => setRollNo(e.target.value)}
          label="Roll No"
          required
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={standard}
          onChange={(e) => setStandard(e.target.value)}
          label="Standard"
          required
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={section}
          onChange={(e) => setSection(e.target.value)}
          label="Section"
          required
          variant="outlined"
        />
        <TextField
          id="outlined-basic"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          label="Age"
          required
          variant="outlined"
        />
      </div>
      <div className="camera">
        <video ref={videoRef}></video>
        <div
          style={
            takingAnotherSnapshot ? { display: "none" } : { display: "block" }
          }
          className="snapshot"
        >
          <canvas ref={snapshotRef}></canvas>
        </div>
        <div className="buttons">
          <Button
            className="button"
            onClick={() =>
              takingAnotherSnapshot ? takeSnapshot() : takeAnotherHandler()
            }
          >
            {takingAnotherSnapshot ? "Capture" : "Take Another"}
          </Button>
        </div>
      </div>
      <Button
        // disabled={takingAnotherSnapshot ? true : false}
        className="button submit"
        type="submit"
      >
        Submit
      </Button>
      {isModalRequested && (
        <ConfirmationModal
          handleClose={setIsModalRequested}
          message={"Registration Successful"}
        />
      )}
    </form>
  );
};

export default Registration;
