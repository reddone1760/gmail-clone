import React, { useEffect, useState } from "react";
import "./Sidebar.css";

//? Firebase
import { db } from "../../firebase";

//? React Router Dom
import { Link } from "react-router-dom";

//? React Redux
import { useDispatch, useSelector } from "react-redux";
import { openSendMessage } from "../../features/mailSlice";
import { selectUser } from "../../features/userSlice";

//? Components
import SidebarOption from "./SidebarOption/SidebarOption";

//? Icon
import { Button, IconButton } from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import InboxIcon from "@material-ui/icons/Inbox";
import StarIcon from "@material-ui/icons/Star";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import NearMeIcon from "@material-ui/icons/NearMe";
import NoteIcon from "@material-ui/icons/Note";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import PersonIcon from "@material-ui/icons/Person";
import DuoIcon from "@material-ui/icons/Duo";
import PhoneIcon from "@material-ui/icons/Phone";

function Sidebar() {
  const user = useSelector(selectUser);

  const dispatch = useDispatch();

  const [selected, setSelected] = useState("Inbox");

  const [sentEmails, setSentEmails] = useState([]);
  const [inboxEmails, setInboxEmails] = useState([]);
  const [favoritesEmails, setFavoritesEmails] = useState([]);

  useEffect(() => {
    db.collection(user?.email)
      .doc("emails")
      .collection("sent")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setSentEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    db.collection(user?.email)
      .doc("emails")
      .collection("inbox")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setInboxEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
    db.collection(user?.email)
      .doc("emails")
      .collection("favorites")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) =>
        setFavoritesEmails(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        )
      );
  }, []);

  return (
    <div className="sidebar">
      <Button
        startIcon={<AddIcon fontSize="large" />}
        className="sidebar__compose"
        onClick={() => dispatch(openSendMessage())}
      >
        Compose
      </Button>

      <Link to="/" style={{ textDecoration: "none" }}>
        <SidebarOption
          Icon={InboxIcon}
          title="Inbox"
          number={inboxEmails.length}
          setSelected={() => {
            setSelected("Inbox");
          }}
          selected={selected === "Inbox" ? true : false}
        />
      </Link>
      <Link to="/favorites" style={{ textDecoration: "none" }}>
        <SidebarOption
          setSelected={() => {
            setSelected("Starred");
          }}
          selected={selected === "Starred" ? true : false}
          Icon={StarIcon}
          title="Starred"
          number={favoritesEmails.length}
        />
      </Link>
      <SidebarOption
        setSelected={() => {
          setSelected("Snoozed");
        }}
        selected={selected === "Snoozed" ? true : false}
        Icon={AccessTimeIcon}
        title="Snoozed"
        // number={snoozedEmails.length}
      />
      <SidebarOption
        setSelected={() => {
          setSelected("Important");
        }}
        selected={selected === "Important" ? true : false}
        Icon={LabelImportantIcon}
        title="Important"
        // number={importantEmails.length}
      />
      <Link to="/sent" style={{ textDecoration: "none" }}>
        <SidebarOption
          setSelected={() => {
            setSelected("Sent");
          }}
          selected={selected === "Sent" ? true : false}
          Icon={NearMeIcon}
          title="Sent"
          number={sentEmails.length}
        />
      </Link>
      <SidebarOption
        setSelected={() => {
          setSelected("Draft");
        }}
        selected={selected === "Draft" ? true : false}
        Icon={NoteIcon}
        title="Draft"
        // number={draftEmail.length}
      />
      <SidebarOption
        setSelected={() => {
          setSelected("More");
        }}
        selected={selected === "More" ? true : false}
        Icon={ExpandMoreIcon}
        title="More"
      />

      <div className="sidebar__footer">
        <div className="sidebar__footerIcons">
          <IconButton>
            <PersonIcon />
          </IconButton>
          <IconButton>
            <DuoIcon />
          </IconButton>
          <IconButton>
            <PhoneIcon />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
