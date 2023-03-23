import { MovieData } from "./movieData";
import { movieTheaterData } from "./movieTheaterData";

export interface movieProjectionData{
    id: number,
    projectionDate: string,
    price: number,
    projectionTime: string, 
    movie: MovieData,
    movieTheater: movieTheaterData,
}