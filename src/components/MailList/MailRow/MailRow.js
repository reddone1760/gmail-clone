import React from "react";
import "./MailRow.css";

//? Firebase
import { db } from "../../../firebase";
import firebase from "firebase";

//? React Redux
import { useDispatch, useSelector } from "react-redux";
import { selectMail } from "../../../features/mailSlice";
import { selectUser } from "../../../features/userSlice";

//? React Router Dom
import { useHistory } from "react-router-dom";

//? Icons
import { Checkbox, IconButton } from "@material-ui/core";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import StarIcon from "@material-ui/icons/Star";
import LabelImportantOutlinedIcon from "@material-ui/icons/LabelImportantOutlined";

function MailRow({ id, to, from, subject, description, time, get }) {
  const user = useSelector(selectUser);

  const history = useHistory();
  const dispatch = useDispatch();

  const setToFav = () => {
    db.collection(user?.email).doc("emails").collection("favorites").add({
      id: id,
      from: from,
      to: to,
      subject: subject,
      message: description,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });
  };

  const deleteMail = () => {
    db.collection(user?.email)
      .doc("emails")
      .collection("favorites")
      .doc(id)
      .delete()
      .then()
      .catch((err) => {
        alert(err);
      });
  };

  const openMail = () => {
    dispatch(
      selectMail({
        id,
        from,
        to,
        get,
        subject,
        description,
        time,
      })
    );

    history.push("/mail");
  };

  return (
    <div className="mailRow">
      {/* <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message="Note archived"
        action={
          <React.Fragment>
            <Button color="secondary" size="small" onClick={handleClose}>
              UNDO
            </Button>
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </React.Fragment>
        }
      /> */}
      <div className="mailRow__options">
        <Checkbox />
        <IconButton onClick={setToFav}>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton>
          <LabelImportantOutlinedIcon />
        </IconButton>
      </div>
      <div onClick={openMail} className="mailRow__rest">
        {!get ? (
          <h3 className="mailRow__title">
            <span>To: </span>
            {to}
          </h3>
        ) : (
          <h3 className="mailRow__title">
            <span>From: </span>
            {from}
          </h3>
        )}

        <div className="mailRow__message">
          <h4>
            {subject}{" "}
            <span className="mailRow__description">- {description}</span>
          </h4>
        </div>
        <p className="mailRow__time">{time}</p>
      </div>
    </div>
  );
}

export default MailRow;
