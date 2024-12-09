import React from "react";
import ShopSpaceForm from "../ShopSpaceForm/ShopSpaceForm";
import ShopSpaceList from "../ShopSpaceList/ShopSpaceList";
import "./Home.css";
const Home = () => {
  return (
    <div className="home-container">
      <h1 className="title">Your Shop Management Platform</h1>
      <ShopSpaceForm />
      <ShopSpaceList />
    </div>
  );
};

export default Home;
