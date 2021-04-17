import React, { useEffect, useState } from "react";
import "./MailList.css";

//? Firebase
import { db } from "../../firebase";

//? React Redux
import { useSelector } from "react-redux";
import { selectUser } from "../../features/userSlice";

//? React Helmet
import { Helmet } from "react-helmet";

//? Components
import Section from "./Section/Section";

//? Icons
import { Checkbox, IconButton } from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import RedoIcon from "@material-ui/icons/Redo";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import KeyboardHideIcon from "@material-ui/icons/KeyboardHide";
import SettingsIcon from "@material-ui/icons/Settings";
import InboxIcon from "@material-ui/icons/Inbox";
import PeopleIcon from "@material-ui/icons/People";
import LocalOfferIcon from "@material-ui/icons/LocalOffer";
import MailRow from "./MailRow/MailRow";

function MailList({ inbox, sent, favorites }) {
  const user = useSelector(selectUser);

  const [sentEmails, setSentEmails] = useState([]);
  const [inboxEmails, setInboxEmails] = useState([]);
  const [favoritesEmails, setFavoritesEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.collection(user?.email)
      .doc("emails")
      .collection("sent")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) =>
          setSentEmails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ),
        setLoading(false)
      );
    db.collection(user?.email)
      .doc("emails")
      .collection("inbox")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) =>
          setInboxEmails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ),
        setLoading(false)
      );
    db.collection(user?.email)
      .doc("emails")
      .collection("favorites")
      .orderBy("timestamp", "desc")
      .onSnapshot(
        (snapshot) =>
          setFavoritesEmails(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          ),
        setLoading(false)
      );
  }, []);
  return (
    <div className="mailList">
      <Helmet>
        {inbox ? (
          <title>Inbox - {user?.email}</title>
        ) : (
          sent && <title>Sent - {user?.email}</title>
        )}
      </Helmet>

      <div className="mailList__settings">
        <div className="mailList__settingsLeft">
          <Checkbox />
          <IconButton>
            <ArrowDropDownIcon />
          </IconButton>
          <IconButton>
            <RedoIcon />
          </IconButton>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
        </div>
        <div className="mailList__settingsRight">
          <IconButton>
            <ChevronLeftIcon />
          </IconButton>
          <IconButton>
            <ChevronRightIcon />
          </IconButton>
          <IconButton>
            <KeyboardHideIcon />
          </IconButton>
          <IconButton>
            <SettingsIcon />
          </IconButton>
        </div>
      </div>

      <div className="mailList__sections">
        <Section Icon={InboxIcon} title="Primary" color="red" selected />
        <Section Icon={PeopleIcon} title="Social" color="#1A73E8" />
        <Section Icon={LocalOfferIcon} title="Promotions" color="green" />
      </div>

      <div className="mailList__list">
        {loading ? (
          <svg viewBox="0 0 300 100">
            <circle cy="50" cx="150" r="10" fill="none" />
          </svg>
        ) : (
          <>
            {sent ? (
              sentEmails.length > 0 ? (
                sentEmails.map(
                  ({ id, data: { to, from, subject, message, timestamp } }) => (
                    <MailRow
                      get={false}
                      id={id}
                      key={id}
                      to={to}
                      from={from}
                      subject={subject}
                      description={message}
                      time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                  )
                )
              ) : (
                <p className="noMails">You doesn't send any Email</p>
              )
            ) : inbox ? (
              inboxEmails.length > 0 ? (
                inboxEmails.map(
                  ({ id, data: { to, from, subject, message, timestamp } }) => (
                    <MailRow
                      get={true}
                      id={id}
                      key={id}
                      to={to}
                      from={from}
                      subject={subject}
                      description={message}
                      time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                  )
                )
              ) : (
                <p className="noMails">You doesn't have any Email</p>
              )
            ) : favorites ? (
              favoritesEmails.length > 0 ? (
                favoritesEmails.map(
                  ({ id, data: { to, from, subject, message, timestamp } }) => (
                    <MailRow
                      get={true}
                      id={id}
                      key={id}
                      to={to}
                      from={from}
                      subject={subject}
                      description={message}
                      time={new Date(timestamp?.seconds * 1000).toUTCString()}
                    />
                  )
                )
              ) : (
                <p className="noMails">You doesn't have any Favorites</p>
              )
            ) : (
              <></>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default MailList;
