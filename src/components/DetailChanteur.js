import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import {
  Grid,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  List,
  CardActions,
  ListItemText,
  ListItem
} from "@mui/material";
import ReactAudioPlayer from "react-audio-player";

import token from "./tokenSpotify";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  },
  method: "GET"
};

function DetailChanteur(props) {
  const [tracks, setTracks] = useState([]);
  let params = useParams();
  console.log(params);
  useEffect(() => {
    if (params.idChanteur) getChanteurTop(params.idChanteur);
  }, []);

  // requete AJAX
  const getChanteurTop = (id) => {
    const spotifyUrlArtistTopTrack = `https://api.spotify.com/v1/artists/${id}/top-tracks?market=fr`;
    console.log(spotifyUrlArtistTopTrack);

    fetch(spotifyUrlArtistTopTrack, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        setTracks(dataJSON.tracks);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Grid container>
      <h2>Top des chansons du chanteur</h2>
      <Grid container>
        {tracks.map((track) => {
          return (
            <Card key={track.id} style={{ width: "150px", margin: "10px" }}>
              <CardMedia
                style={{ height: "150px" }}
                image={track.album.images[1].url}
                title={track.name}
              ></CardMedia>
              <CardActions>
                {track.preview_url && (
                  <ReactAudioPlayer
                    src={track.preview_url}
                    controls
                  ></ReactAudioPlayer>
                )}
              </CardActions>
              <CardContent>{track.name}</CardContent>
            </Card>
          );
        })}
      </Grid>
    </Grid>
  );
}

export default DetailChanteur;
