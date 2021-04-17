import React from "react";
import "./Mail.css";

//? React Redux
import { useSelector } from "react-redux";
import { selectOpenMail } from "../../features/mailSlice";

//? React Router Dom
import { useHistory } from "react-router-dom";

//? Icons
import Tooltip from "@material-ui/core/Tooltip";
import { IconButton } from "@material-ui/core";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import MoveToInboxIcon from "@material-ui/icons/MoveToInbox";
import ErrorIcon from "@material-ui/icons/Error";
import DeleteIcon from "@material-ui/icons/Delete";
import EmailIcon from "@material-ui/icons/Email";
import WatchLaterIcon from "@material-ui/icons/WatchLater";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import LabelImportantIcon from "@material-ui/icons/LabelImportant";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import UnfoldMoreIcon from "@material-ui/icons/UnfoldMore";
import PrintIcon from "@material-ui/icons/Print";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

function Mail() {
  const history = useHistory();
  const selectedMail = useSelector(selectOpenMail);

  if (selectedMail == null) {
    history.push("/");
  }

  return (
    <div className="mail">
      <div className="mail__tools">
        <div className="mail__toolsLeft">
          <Tooltip title="Go Back">
            <IconButton onClick={() => history.push("/")}>
              <ArrowBackIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Move To Inbox">
            <IconButton>
              <MoveToInboxIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Information">
            <IconButton>
              <ErrorIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="">
            <IconButton>
              <EmailIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Watch Later">
            <IconButton>
              <WatchLaterIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Check">
            <IconButton>
              <CheckCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reply">
            <IconButton>
              <LabelImportantIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="More">
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </Tooltip>
        </div>
        <div className="mail__toolsRight">
          <IconButton>
            <UnfoldMoreIcon />
          </IconButton>
          <IconButton>
            <PrintIcon />
          </IconButton>
          <IconButton>
            <ExitToAppIcon />
          </IconButton>
        </div>
      </div>

      <div className="mail__body">
        <div className="mail__bodyHeader">
          <h2>{selectedMail?.subject}</h2>
          <LabelImportantIcon className="mail__important" />
          {selectedMail?.get ? (
            <p>{selectedMail?.from}</p>
          ) : (
            <p>{selectedMail?.to}</p>
          )}
          <p className="mail__time">{selectedMail?.time}</p>
        </div>

        <div className="mail__message">
          <p>{selectedMail?.description}</p>
        </div>
      </div>
    </div>
  );
}

export default Mail;
