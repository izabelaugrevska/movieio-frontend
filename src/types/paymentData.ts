import { movieProjectionData } from "./movieProjectionData";
import { seatData } from "./seatData";

export interface paymentData{
    id: number,
    amount: number,
    customerId: number,
    movieProjection: movieProjectionData,
    seat: seatData,
}