import "../App.css";
import { useState } from "react";
import { Link, } from "react-router-dom";
import AppHeader from "../components/AppHeader";
type Tabs = "search" | "favourites";

const AppHome = () => {

  const [selectedTab, setSelectedTab] = useState<Tabs>("search");




  return (
    <>
      <AppHeader />
      <div className="app-container">
        <div className="header">
          <img src="/hero-image.jpg" alt="Hero"></img>
          <div className="title">Recipe4Me</div>
        </div>
        <div className="tabs">
          <Link to="/search" className={selectedTab === "search" ? "tab-active" : ""}>
            <h1>Recipe Search</h1>
          </Link>
          <Link to="/favourites" className={selectedTab === "favourites" ? "tab-active" : ""}>
            <h1>Favourites</h1>
          </Link>
        </div>
      </div>
    </>
  )
};


export default AppHome;

