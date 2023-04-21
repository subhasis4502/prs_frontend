import React, { useState } from "react";
import List from "../../components/list/List";
import Topbar from "../../components/topbar/Topbar";

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (value) => {
    setSearchTerm(value);
    console.log(searchTerm)
  };

  return (
    <>
      <Topbar onSearch={handleSearch}/>
      <List searchTerm={searchTerm}/>
    </>
  );
};

export default Home;
