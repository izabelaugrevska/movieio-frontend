import { Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import { MovieData } from '../types/movieData';

const HomePage = () => {
  const [movies, setMovies] = useState<MovieData[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const response = await fetch('http://localhost:8080/api/movies');
      const data = await response.json();
      setMovies(data);
    };

    fetchMovies();
  }, [])

  return (
    <Container maxWidth="lg" sx={{ flexGrow: 1, paddingTop: 20 }}>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item key={movie.id} xs={12} sm={6} md={4}>
            <MovieCard
              movie={movie}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default HomePage;
