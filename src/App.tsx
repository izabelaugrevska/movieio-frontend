import Box from "@mui/material/Box";
import { useState } from "react";
import "./App.css";
import HomePage from "./home/home";
import Movie from "./movie/movie";
import Projections from "./movieProjections/projectionsPage";
import Reviews from "./movieReview/reviewPage";
import Navbar from "./Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState();

  return <HomePage />;
  return <Movie />;
  return <Projections />;
  return <Reviews/>;
}

export default App;
