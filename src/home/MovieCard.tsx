import { Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { MovieData } from "../types/movieData";

interface IMovieCardProps {
  movie: MovieData;
}

const MovieCard = ({
  movie
}: IMovieCardProps) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Link to={`/movie/${movie.id}`}>
      <CardActionArea>
        <CardMedia
          sx={{ height: 450, objectFit: "cover" }}
           image={movie.coverUrl}
          title={movie.movieName}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {movie.movieName}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {movie.director}
          </Typography>
        </CardContent>
      </CardActionArea>
      </Link>
    </Card>
  );
};

export default MovieCard;
