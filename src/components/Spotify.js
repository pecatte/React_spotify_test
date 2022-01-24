import React, { useState } from "react";

import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import {
  Container,
  AppBar,
  Grid,
  Toolbar,
  IconButton,
  Typography,
  Button
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import Albums from "./Albums";
import DetailAlbum from "./DetailAlbum";
import Chanteurs from "./Chanteurs";
import DetailChanteur from "./DetailChanteur";

function Spotify(props) {
  function Home() {
    return <h2>Bienvenue</h2>;
  }
  return (
    <BrowserRouter>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Link to="/">
              <MenuIcon></MenuIcon>
            </Link>
          </IconButton>
          <Typography variant="h6">Spotify MMI</Typography>
          <Link to="/albums">
            <Button color="inherit">Albums</Button>
          </Link>
          <Link to="/chanteurs">
            <Button color="inherit">Chanteurs</Button>
          </Link>
          <Link to="/chansons">
            <Button color="inherit">Chansons</Button>
          </Link>
        </Toolbar>
      </AppBar>

      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/albums" element={<Albums />}></Route>
        <Route path="/chanteurs" element={<Chanteurs />}></Route>

        <Route path="/detailAlbum/:idAlbum" element={<DetailAlbum />}></Route>
        <Route
          path="/detailChanteur/:idChanteur"
          element={<DetailChanteur />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default Spotify;
