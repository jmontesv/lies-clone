import React from "react";
import "./App.css";
import MainPage from "./components/pages/main_page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LobbyProvider } from "./contexts/LobbyProvider";
import Lobby from "./components/pages/lobby";
import { SocketProvider } from "./contexts/SocketProvider";
import { UserProvider } from "./contexts/UserProvider";

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

                <Route path="/lobby/">
                  <Lobby />
                </Route>
                <Route path="/:invitationId?/">
                  <MainPage create_lobby={false} />
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
