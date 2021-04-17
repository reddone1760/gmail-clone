import React, { useEffect } from "react";
import "./App.css";

//? Firebase
import { auth } from "./firebase";

//? React Redux
import { useDispatch, useSelector } from "react-redux";
import { selectSendMessageIsOpen } from "./features/mailSlice";
import { login, selectUser } from "./features/userSlice";

//? React Router
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//? Components
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Mail from "./components/Mail/Mail";
import MailList from "./components/MailList/MailList";
import SendMail from "./components/SendMail/SendMail";
import Login from "./components/Login/Login";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      user &&
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
    });
  }, []);
  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />

          <div className="app__body">
            <Sidebar />

            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/favorites">
                <MailList favorites />
              </Route>
              <Route path="/sent">
                <MailList sent />
              </Route>
              <Route path="/">
                <MailList inbox />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
