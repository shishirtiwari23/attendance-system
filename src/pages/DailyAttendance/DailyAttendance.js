import "./DailyAttendance.css";
import { useRef, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { ConfirmationModal } from "../../components";

const DailyAttendance = () => {
  const videoRef = useRef(null);
  const snapshotRef = useRef(null);
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
  function takeSnapshot() {
    const dimension = { width: 1000, height: 1000 / (16 / 9) };
    let video = videoRef.current;
    let snapshot = snapshotRef.current;
    snapshot.width = dimension.width;
    snapshot.height = dimension.height;

    let context = snapshot.getContext("2d");
    context.drawImage(video, 0, 0, dimension.width, dimension.height);
    setTakingAnotherSnapshot(false);
  }
  useEffect(() => {
    getVideo();
  }, [videoRef]);

  useEffect(() => {
    console.log(takingAnotherSnapshot);
  });

  function takeAnotherHandler() {
    setTakingAnotherSnapshot(true);
  }
  function submitHandler() {
    setIsModalRequested(true);
    setTakingAnotherSnapshot(true);
    setTimeout(() => setIsModalRequested(false), 3000);
  }
  return (
    <form className="daily-attendance">
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
        <Button
          disabled={takingAnotherSnapshot ? true : false}
          className="button submit"
          onClick={submitHandler}
        >
          Submit
        </Button>
      </div>
      {isModalRequested && (
        <ConfirmationModal
          handleClose={setIsModalRequested}
          message={"Attendance Recorded"}
        />
      )}
    </form>
  );
};

export default DailyAttendance;
