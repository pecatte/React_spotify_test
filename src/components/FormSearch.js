import React, { useState } from "react";
import { TextField, Button, Card } from "@mui/material";

function FormSearch(props) {
  const [text, setTexte] = useState("");

  const handlerTextChange = (event) => {
    setTexte(event.target.value);
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    props.handleSearch(text);
    setTexte("");
  };

  return (
    <Card style={{ margin: "10px" }}>
      <form
        style={{ display: "flex" }}
        noValidate
        autoComplete="off"
        onSubmit={(e) => handlerSubmit(e)}
      >
        <div>
          <TextField
            id="text"
            label="texte"
            value={text}
            onChange={(e) => handlerTextChange(e)}
          />
        </div>
        <div>
          <Button type="submit" variant="outlined" size="small">
            Valider
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default FormSearch;
