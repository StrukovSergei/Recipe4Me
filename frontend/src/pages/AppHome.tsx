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

    </>
  )
};


export default AppHome;

