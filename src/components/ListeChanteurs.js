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
const spotifyUrlSearchArtist =
  "https://api.spotify.com/v1/search?type=artist&market=FR&limit=" +
  pageSize +
  "&q=";
const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  },
  method: "GET"
};

function ListeChanteurs(props) {
  const [listeA, setListeA] = useState([]);
  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);

  useEffect(() => {
    getArtists(props.query);
  }, [props.query, current]);
  // requete AJAX
  const getArtists = (search) => {
    let offset = (current - 1) * pageSize;
    console.log(`offset : ${offset}`);
    fetch(spotifyUrlSearchArtist + search + "&offset=" + offset, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        setListeA(dataJSON.artists.items);
        setTotal(dataJSON.artists.total);
      })
      .catch((error) => console.log(error));
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
          {listeA.map((artist) => {
            console.log(artist.id);
            return (
              <Card key={artist.id} style={{ width: "150px", margin: "10px" }}>
                <Link to={"/detailChanteur/" + artist.id}>
                  <CardMedia
                    style={{ height: "150px" }}
                    image={artist.images.length > 0 && artist.images[1].url}
                    title={artist.name}
                  ></CardMedia>
                </Link>
                <CardContent>{artist.name}</CardContent>
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

export default ListeChanteurs;
