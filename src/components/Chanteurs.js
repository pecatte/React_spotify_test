import React, { useState } from "react";
import ListeChanteurs from "./ListeChanteurs";
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
      <ListeChanteurs query={search}></ListeChanteurs>
    </div>
  );
}
