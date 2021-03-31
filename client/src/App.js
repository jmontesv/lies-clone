import React, { useRef } from "react";
import "./App.css";
import { Form, FormControl, Button } from "react-bootstrap";

function App() {
  const nickNameRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
    const nickName = nickNameRef.current.value;
    console.log("funciona " + nickName);
  };

  return (
    <div className="App">
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

export default App;
