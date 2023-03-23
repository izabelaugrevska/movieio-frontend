import { movieProjectionData } from "./movieProjectionData";

export interface movieTheaterData{
    id: number,
    capacity: number,
    movieTheaterName: string,
    projections: movieProjectionData[],
}