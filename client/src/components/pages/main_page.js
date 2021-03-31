import React, { useRef } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { useLobby } from "../../contexts/LobbyProvider";

function MainPage() {
  const nickNameRef = useRef(null);
  const history = useHistory("");
  const { setLobby } = useLobby();

  const submitHandler = (e) => {
    e.preventDefault();

    const nickName = nickNameRef.current.value;
    if (nickName) {
      const lobbyId = uuidv4();
      setLobby({
        lobbyLeader: nickName,
        lobbyId,
        players: [nickName],
      });
      history.push("/lobby");
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
              Crear Sala
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default MainPage;
