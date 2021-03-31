import React, { useRef } from "react";
import "./App.css";
import MainPage from "./components/pages/main_page";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { LobbyProvider } from "./contexts/LobbyProvider";
import Lobby from "./components/pages/lobby";

function App() {
  const nickNameRef = useRef(null);

  return (
    <div className="App">
      <LobbyProvider>
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
      </LobbyProvider>
    </div>
  );
}

export default App;
