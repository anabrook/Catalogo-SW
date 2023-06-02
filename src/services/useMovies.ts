import { useQuery } from "react-query";
import axios from "axios";
import { Movie } from "@/types/Movies";
import { useMovieSearch } from "@/jotai/movieSearch";

const getMovies = async (search: string) => {
  const { data } = await axios.get<{ results: Movie[] }>(
    `https://swapi.dev/api/films?search=${search}`
  );
  return data.results;
};

const useMovies = () => {
  const [search] = useMovieSearch();
  return useQuery("movies", async () => getMovies(search));
};

export default useMovies;
