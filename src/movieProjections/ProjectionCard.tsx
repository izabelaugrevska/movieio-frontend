import { Box, Card, CardActionArea, CardContent } from "@mui/material";
import { useEffect } from "react";
import { movieProjectionData } from "../types/movieProjectionData";
import { CardHeader } from "@mui/material";

interface IProjectionCardProps {
  projection: movieProjectionData;
  handleClick: (projection: movieProjectionData) => void;
  selected: boolean;
}

const ProjectionCard = ({
  projection,
  handleClick,
  selected,
}: IProjectionCardProps) => {
  const weekdays = [
    "Недела",
    "Понеделник",
    "Вторник",
    "Среда",
    "Четврток",
    "Петок",
    "Сабота",
  ];

  const backgroundColor = selected ? "lightblue" : "inherit";
  return (
    <>
      <Card
        sx={{ maxWidth: 200, backgroundColor: { backgroundColor } }}
        elevation={0}
      >
        <CardActionArea onClick={() => handleClick(projection)}>
          <CardHeader
            title={projection.projectionDate.substring(0, 10)}
            titleTypographyProps={{
              color: "#E3E720",
              fontWeight: "600",
            }}
          />
          <CardContent>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <Box>
                {weekdays[new Date(projection.projectionDate).getDay()]}
              </Box>
              <Box>{projection.projectionTime}</Box>
              <Box>{projection.movieTheater.movieTheaterName}</Box>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default ProjectionCard;
