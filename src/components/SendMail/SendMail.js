import React from "react";
import "./SendMail.css";

//? Firebase
import firebase from "firebase";
import { db } from "../../firebase";

//? React Redux
import { useDispatch, useSelector } from "react-redux";
import { closeSendMessage } from "../../features/mailSlice";
import { selectUser } from "../../features/userSlice";

//? React Hook Form
import { useForm } from "react-hook-form";

//? Icons
import { Button } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";

function SendMail() {
  const user = useSelector(selectUser);
  const { register, handleSubmit, watch, errors } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
    db.collection(formData.to)
      .doc("emails")
      .collection("inbox")
      .add({})
      .then((docRef) => {
        db.collection(formData.to)
          .doc("emails")
          .collection("inbox")
          .doc(docRef.id)
          .set({
            id: docRef.id,
            from: user?.email,
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      });

    db.collection(user?.email)
      .doc("emails")
      .collection("sent")
      .add({})
      .then((docRef) => {
        db.collection(user?.email)
          .doc("emails")
          .collection("sent")
          .doc(docRef.id)
          .set({
            id: docRef.id,
            from: user?.email,
            to: formData.to,
            subject: formData.subject,
            message: formData.message,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
          });
      });

    dispatch(closeSendMessage());
  };

  const dispatch = useDispatch();

  return (
    <div className="sendMail">
      <div className="sendMail__header">
        <h3>New Message</h3>
        <CloseIcon
          onClick={() => {
            dispatch(closeSendMessage());
          }}
          className="sendMail__close"
        />
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          name="to"
          placeholder="To"
          type="email"
          ref={register({ required: true })}
        />
        {errors.to && <p className="sendMail__errors">To is required</p>}
        <input
          name="subject"
          placeholder="Subject"
          type="text"
          ref={register({ required: true })}
        />
        {errors.subject && (
          <p className="sendMail__errors">Subject is required</p>
        )}
        <input
          name="message"
          placeholder="Message..."
          type="text"
          className="sendMail__message"
          ref={register({ required: true })}
        />
        {errors.message && (
          <p className="sendMail__errors">Message is required</p>
        )}

        <div className="sendMail__options">
          <Button
            className="sendMail__send"
            variant="contained"
            color="primary"
            type="submit"
          >
            Send
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SendMail;
