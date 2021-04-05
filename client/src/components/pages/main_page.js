import React, { useEffect, useRef } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import API from "../../axios";
import { useLobby } from "../../contexts/LobbyProvider";
import { useUser } from "../../contexts/UserProvider";
import { useSocket } from "../../contexts/SocketProvider";

function MainPage({ create_lobby }) {
  const nickNameRef = useRef(null);
  const history = useHistory("");
  const socket = useSocket();
  const { invitationId } = useParams();
  const { lobby, setLobby, setUsers } = useLobby();
  const { setUser } = useUser();

  useEffect(() => {
    if (invitationId) {
      API.get(`/rooms/${invitationId}`)
        .then((response) => {
          console.log(response.data);
          const newLobby = response.data;
          setLobby(newLobby);
          setUsers(newLobby.users);
        })
        .catch(() => {
          history.push("/");
        });
    }
  }, []);

  const createNewLobby = (userName) => {
    const lobbyId = uuidv4();
    const invitationId = uuidv4();
    const userId = uuidv4();
    const newUser = {
      socketId: socket.id,
      userName,
      isHost: true,
    };
    const newLobby = { id: lobbyId, invitationId, users: [] };
    Promise.all([API.post("/rooms", newLobby), API.post("/register", newUser)])
      .then(() => {
        setLobby(newLobby);
        setUser(newUser);
        history.push("/lobby");
      })
      .catch((error) => console.error(error));
  };

  const joinLobby = (userName) => {
    console.log("Entrando a lobby...");
    const newUser = {
      socketId: socket.id,
      userName,
      isHost: false,
    };
    API.post("register", newUser).then(() => {
      setUser(newUser);
      history.push("/lobby");
    });
    // history.push("/lobby");
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const userName = nickNameRef.current.value;
    if (userName) {
      create_lobby ? createNewLobby(userName) : joinLobby(userName);
    } else {
      alert("Tu NickName no puede estar vacio!");
    }
  };

  return (
    <div>
      <div className="h-100">
        <Form
          className="col-lg-6 offset-lg-3 mt-3 d-flex flex-column"
          onSubmit={submitHandler}
        >
          <Form.Group>
            <Form.Label>Nick Name</Form.Label>
            <FormControl
              type="text"
              placeholder="MiNickName"
              ref={nickNameRef}
            />
          </Form.Group>
          <div className="align-self-center">
            <Button className="mt-2" type="submit" variant="light">
              {create_lobby ? "Crear sala" : "Unirse a sala"}
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

MainPage.defaultProps = {
  create_lobby: true,
};

export default MainPage;
