import React, { useState } from "react";
import ShopSpaceForm from "../ShopSpaceForm/ShopSpaceForm";
import ShopSpaceList from "../ShopSpaceList/ShopSpaceList";
import "./Home.css";
const Home = () => {
  const [refresh, setRefresh] = useState(false);
  return (
    <div className="home-container">
      <h1 className="title">Your Shop Management Platform</h1>
      <ShopSpaceForm setRefresh={setRefresh} />
      <ShopSpaceList refresh={refresh} setRefresh={setRefresh} />
    </div>
  );
};

export default Home;
