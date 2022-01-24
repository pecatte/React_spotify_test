import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  Button
} from "@mui/material";

import Pagination from "rc-pagination";
import "rc-pagination/assets/index.css";

import token from "./tokenSpotify";

const pageSize = 10;
const spotifyUrlSearchAlbum =
  "https://api.spotify.com/v1/search?type=album&market=FR&limit=" +
  pageSize +
  "&q=";
const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  },
  method: "GET"
};

function ListeAlbums(props) {
  const [listeA, setListeA] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    getAlbums(props.query);
  }, [props.query, current]);
  // requete AJAX
  const getAlbums = (search) => {
    let offset = (current - 1) * pageSize;
    console.log(`offset : ${offset}`);
    fetch(spotifyUrlSearchAlbum + search + "&offset=" + offset, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        setListeA(dataJSON.albums.items);
        setTotal(dataJSON.albums.total);
      })
      .catch((error) => console.log(error));
  };
  const handleChoixAlbum = (id) => {
    console.log("id:" + id);
    props.handleIdAlbum(id);
  };
  const onChange = (page) => {
    console.log(page);
    setCurrent(page);
  };
  if (listeA.length == 0) return <div></div>;
  else
    return (
      <Grid container>
        <Grid container>
          {listeA.map((album) => {
            return (
              <Card key={album.id} style={{ width: "150px", margin: "10px" }}>
                <Link to={"/detailAlbum/" + album.id}>
                  <CardMedia
                    style={{ height: "150px" }}
                    image={album.images[1].url}
                    title={album.name}
                    //onClick={() => handleChoixAlbum(album.id)}
                  ></CardMedia>
                </Link>

                <CardContent>{album.name}</CardContent>
              </Card>
            );
          })}
        </Grid>
        <Pagination
          onChange={onChange}
          current={current}
          defaultPageSize={10}
          total={total}
        ></Pagination>
      </Grid>
    );
}

export default ListeAlbums;
