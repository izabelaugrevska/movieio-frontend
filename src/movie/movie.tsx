import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MovieData } from "../types/movieData";

const Movie = () => {
  let { id } = useParams();
  const [movie, setMovie] = useState<MovieData>({
    id: 99,
    movieName: " ",
    director: " ",
  });

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:8080/api/movies/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, []);

  useEffect(() => {
    console.log(movie);
  }, [movie]);

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2 }}>
            <img src={movie.coverUrl} alt={movie.movieName} width="100%" />
          </Paper>
        </Grid>
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h4" gutterBottom>
              {movie.movieName}
            </Typography>
            <Typography variant="h6" gutterBottom>
              {movie.genre?.map((genre) => `${genre.genreName} `)} |{" "}
              {movie.director}
            </Typography>
            <Typography variant="h6" gutterBottom>
              Rating: {movie.moviePoints} stars
            </Typography>
            <Link to={`/movie/${movie.id}/projections`}>
              <Button variant="contained" color="primary" sx={{ mr: 2, mt: 2 }}>
                Buy
              </Button>
            </Link>
            <Link to={`/movie/${movie.id}/review`}>
              <Button variant="contained" color="secondary" sx={{ mt: 2 }}>
                Write a Review
              </Button>
            </Link>
            <Typography variant="h5" mt={3} mb={2}>
              Reviews
            </Typography>
            {movie.reviews &&
              movie.reviews.map((review, index: number) => (
                <Paper key={index} sx={{ p: 2, mb: 2 }}>
                  <Typography variant="body1" component="p">
                    {review.description}
                  </Typography>
                  <Typography variant="caption" color="textSecondary">
                    {review.user.firstName} - {review.date}
                  </Typography>
                </Paper>
              ))}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default Movie;
