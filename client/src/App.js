import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LobbyProvider from "./contexts/LobbyProvider";
import UserProvider from "./contexts/UserProvider";
import SocketProvider from "./contexts/SocketProvider";
import MainPage from "./pages/MainPage";
import Lobby from "./pages/Lobby";

function App() {
  return (
    <div className="App">
      <UserProvider>
        <SocketProvider>
          <LobbyProvider>
            <Router>
              <Switch>
                <Route exact path="/">
                  <MainPage />
                </Route>
                <Route path="/lobby">
                  <Lobby />
                </Route>
                <Route path="/:invitationId?">
                  <MainPage createLobby={false} />
                </Route>
              </Switch>
            </Router>
          </LobbyProvider>
        </SocketProvider>
      </UserProvider>
    </div>
  );
}

export default App;
