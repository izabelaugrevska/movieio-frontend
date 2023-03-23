import { seatData } from "../types/seatData";
import { DataGrid, GridColDef, GridValueGetterParams } from "@mui/x-data-grid";
import ChairOutlinedIcon from "@mui/icons-material/ChairOutlined";
import ChairIcon from "@mui/icons-material/Chair";
import {
  Backdrop,
  Box,
  Button,
  Fade,
  Grid,
  IconButton,
  Modal,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import { MovieData } from "../types/movieData";
import { movieProjectionData } from "../types/movieProjectionData";
import { useAuth } from "../auth/AuthContext";

interface ISeatsTableProps {
  seats: seatData[];
  movie: MovieData;
  projection: movieProjectionData;
}

const SeatsTable = ({ seats, movie, projection }: ISeatsTableProps) => {
  const [numColumns, setNumColumns] = useState<number>(1);
  const [numRows, setNumRows] = useState<number>(1);
  const [open, setOpen] = useState<boolean>(false);
  const [selectedSeat, setSelectedSeat] = useState<seatData>();
  const [isChecked, setIsChecked] = useState(false);

  const { user } = useAuth();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleBuyClick = async () => {
    try {
      const response = await fetch(
        "http://localhost:8080/api/payment/addPayment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: projection.price,
            customerId: user,
            movieProjectionId: projection.id,
            seatId: selectedSeat?.seatId,
          }),
        }
      );

      if (!response.ok) {
        console.log(response);
        throw new Error("Buying failed!");
      }
      handleClose();
    } catch (error) {
      console.error(error);
      // handle login error
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = (seat: seatData) => {
    setSelectedSeat(seat);
    setOpen(true);
  };

  useEffect(() => {
    setNumColumns(Math.ceil(Math.sqrt(seats.length)));
    setNumRows(Math.ceil(seats.length / numColumns));
  }, [seats, numColumns, numRows]);

  return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Grid container spacing={2}>
        {seats.map((seat) => {
          return (
            <>
              {seat.status && seat.status === "booked" && (
                <IconButton onClick={() => handleOpen(seat)}>
                  <ChairIcon />
                </IconButton>
              )}
              {!seat.status && (
                <IconButton onClick={() => handleOpen(seat)}>
                  <ChairOutlinedIcon />
                </IconButton>
              )}
              <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  "& .MuiPaper-root": {
                    outline: "none!important",
                  },
                }}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                  timeout: 500,
                }}
              >
                <Fade in={open}>
                  <Paper>
                    <Box
                      minWidth="20vw"
                      minHeight="20vh"
                      maxWidth="90vw"
                      maxHeight="90vh"
                      overflow="auto"
                      display="flex"
                      flexDirection="column"
                      position="relative"
                      justifyContent="center"
                      alignItems="center"
                      sx={{
                        backgroundColor: "white",
                        borderRadius: 2,
                      }}
                    >
                      {handleClose ? (
                        <IconButton
                          aria-label="close"
                          onClick={handleClose}
                          sx={{
                            position: "absolute",
                            right: 8,
                            top: 8,
                            color: (theme) => theme.palette.grey[500],
                            zIndex: 1,
                          }}
                        >
                          <CloseIcon />
                        </IconButton>
                      ) : null}
                      <Box>
                        <Typography variant="h3">{movie.movieName}</Typography>
                        <Typography variant="h6">
                          Projection time: {projection.projectionTime}
                        </Typography>
                        <Typography variant="h6">
                          Theater Name:{" "}
                          {projection.movieTheater.movieTheaterName}
                        </Typography>
                        <Typography variant="h6">
                          Seat Number: {selectedSeat?.seatNumber}
                        </Typography>
                        <Typography variant="h6">
                          Price: {projection.price}MKD
                        </Typography>
                        <label>
                          <input
                            type="checkbox"
                            checked={isChecked}
                            onChange={handleCheckboxChange}
                          />
                          I agree to the terms and conditions
                        </label>
                        <Box>
                          <Button
                            disabled={!isChecked}
                            onClick={handleBuyClick}
                            variant="contained"
                          >
                            Buy
                          </Button>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Fade>
              </Modal>
            </>
          );
        })}
      </Grid>
    </Box>
  );
};

export default SeatsTable;
