import React, { useState } from "react";
import ListeAlbums from "./ListeAlbums";
import FormSearch from "./FormSearch";

export default function Albums() {
  const [search, setSearch] = useState("");
  const [idAlbum, setIdAlbum] = useState("");

  const handleSearch = (text) => {
    setSearch(text);
  };
  const handleIdAlbum = (id) => {
    setIdAlbum(id);
  };
  return (
    <div>
      <FormSearch handleSearch={handleSearch}></FormSearch>
      <ListeAlbums query={search}></ListeAlbums>
    </div>
  );
}
