import { Button } from "@mui/material";
import "./ConfirmationModal.css";

const ConfirmationModal = ({ message, handleClose }) => {
  return (
    <div className="modal">
      <div className="content">
        <h2>{message}</h2>
        <Button onClick={() => handleClose(false)} className="button">
          Close
        </Button>
      </div>
    </div>
  );
};

export default ConfirmationModal;
