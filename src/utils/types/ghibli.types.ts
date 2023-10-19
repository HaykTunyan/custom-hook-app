import { UrlType } from "./shared.types";

export type GhibliFilm = {
    description: string;
    director: string;
    id: string;
    image: UrlType;
    location: UrlType[];
    movie_banner: UrlType;
    original_title: string;
    original_title_romanised: string;
    people: UrlType[];
    producer: string;
    release_date: string;
    rt_score: string;
    running_time: string;
    species: UrlType[];
    title: string;
    url: UrlType;
    vehicles: UrlType[];
  }