import React from "react";
import "./App.css";
import MainPage from "./components/pages/main_page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LobbyProvider } from "./contexts/LobbyProvider";
import Lobby from "./components/pages/lobby";
import { SocketProvider } from "./contexts/SocketProvider";

function App() {
  return (
    <div className="App">
      <LobbyProvider>
        <SocketProvider>
          <Router>
            <Switch>
              <Route exact path="/">
                <MainPage />
              </Route>
              <Route path="/lobby">
                <Lobby />
              </Route>
            </Switch>
          </Router>
        </SocketProvider>
      </LobbyProvider>
    </div>
  );
}

export default App;
