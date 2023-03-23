import { genreData } from "./genreData";
import { ReviewData } from "./reviewData";

export interface MovieData {
  id: number;
  movieName: string;
  director: string;
  movieLength?: number;
  moviePoints?: number;
  reviews?: ReviewData[];
  genre?: genreData[];
  coverUrl?: string;
}