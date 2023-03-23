import { UserData } from "./userData";

export interface ReviewData {
  description: string;
  rating: number;
  date: string;
  movieId: number;
  user: UserData;
}