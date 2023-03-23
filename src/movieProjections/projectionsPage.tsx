import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MovieData } from "../types/movieData";
import { movieProjectionData } from "../types/movieProjectionData";
import { seatData } from "../types/seatData";
import ProjectionCard from "./ProjectionCard";
import SeatsTable from "./SeatsTable";

const Projections = () => {
  const { id } = useParams();
  const [projections, setProjections] = useState<movieProjectionData[]>([]);
  const [selectedProjection, setSelectedProjection] = useState<
    movieProjectionData | undefined
  >();
  const [projectionSeats, setProjectionSeats] = useState<
    { projectionId: number; seats: seatData[] }[]
  >([]);
  const [seats, setSeats] = useState<seatData[]>([]);
  const [movie, setMovie] = useState<MovieData>({
    id: 99,
    director: "",
    movieName: "",
  });

  useEffect(() => {
    const fetchProjections = async () => {
      const response = await fetch(
        `http://localhost:8080/api/projections/getProjectionsByMovieId/${id}`
      );
      const data = await response.json();
      setProjections(data);
    };

    fetchProjections();
  }, []);

  useEffect(() => {
    const fetchMovie = async () => {
      const response = await fetch(`http://localhost:8080/api/movies/${id}`);
      const data = await response.json();
      setMovie(data);
    };

    fetchMovie();
  }, []);

  useEffect(() => {
    const fetchSeats = async () => {
      let seats: any[] = [];
      projections.forEach(async (projection) => {
        const response = await fetch(
          `http://localhost:8080/api/seats/getSeatsByMovieTheaterId/${projection.movieTheater.id}`
        );
        const data = await response.json();
        const seatsData = {
          seats: data,
          projectionId: projection.id,
        };
        seats.push(seatsData);
      });
      setProjectionSeats(seats);
    };
    fetchSeats();
  }, [projections, selectedProjection]);

  useEffect(() => {
    if (selectedProjection) {
      const seats = projectionSeats.filter(
        (proj) => proj.projectionId === selectedProjection.id
      );
      setSeats(seats[0].seats);
    }
  }, [projections, selectedProjection]);

  useEffect(() => {
    console.log(seats);
  }, [seats]);

  const handleClick = (projection: movieProjectionData) => {
    setSelectedProjection(projection);
  };

  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "100px",
          }}
        >
          {projections.map((projection) => (
            <ProjectionCard
              projection={projection}
              handleClick={handleClick}
              selected={selectedProjection === projection}
            />
          ))}
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {selectedProjection && selectedProjection.id && (
            <SeatsTable
              seats={seats}
              projection={selectedProjection}
              movie={movie}
            />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Projections;
