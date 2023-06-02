import { useMutation, useQuery } from "react-query";
import axios from "axios";
import { Character } from "@/types/Characters";

const getCharacters = async (filmeId: string) => {
  const { data } = await axios.get<{ results: Character[] }>(
    `https://swapi.dev/api/people`
  );
  return data.results;
};

const useCharacters = (filmeId: string) => {
  return useQuery("characters", async () => getCharacters(filmeId));
};

export default useCharacters;
