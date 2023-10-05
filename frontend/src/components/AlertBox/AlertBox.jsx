import React from "react";
import {Alert} from "@mui/material";
import {Snackbar} from "@mui/material";
import './AlertBox.css'

const AlertBox = ({message, alertType}) => {

    const handleClose = () => {
        
    }

  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert variant="filled" onClose={handleClose} severity={alertType} className="alert-text">
        {message}
      </Alert>
    </Snackbar>
  );
};

export default AlertBox
