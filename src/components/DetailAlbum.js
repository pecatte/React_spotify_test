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

const spotifyUrlAlbum = "https://api.spotify.com/v1/albums/";

const fetchOptions = {
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer " + token
  },
  method: "GET"
};

function DetailAlbum(props) {
  const [album, setAlbum] = useState(null);
  let params = useParams();
  useEffect(() => {
    if (params.idAlbum) getAlbum(params.idAlbum);
  }, [props]);

  // requete AJAX
  const getAlbum = (id) => {
    fetch(spotifyUrlAlbum + id, fetchOptions)
      .then((response) => {
        return response.json();
      })
      .then((dataJSON) => {
        console.log(dataJSON);
        setAlbum(dataJSON);
      })
      .catch((error) => console.log(error));
  };
  if (!album) return <div></div>;
  else
    return (
      <Grid container>
        <Card style={{ width: "600px", margin: "10px" }}>
          <CardMedia
            style={{ height: "300px" }}
            image={album.images[0].url}
            title={album.name}
          ></CardMedia>

          <CardContent>
            <Typography variant="h6" component="h2">
              {album.name}
            </Typography>
          </CardContent>
          <CardActions>
            <List>
              {album.tracks.items.map((track) => {
                return (
                  <ListItem key={track.id}>
                    <ListItemText>{track.name}</ListItemText>
                    {track.preview_url != null && (
                      <ReactAudioPlayer
                        src={track.preview_url}
                        controls
                      ></ReactAudioPlayer>
                    )}
                  </ListItem>
                );
              })}
            </List>
          </CardActions>
        </Card>
      </Grid>
    );
}

export default DetailAlbum;
