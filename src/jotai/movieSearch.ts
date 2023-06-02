import { atom, useAtom } from "jotai";

const movieSearch = atom("");

export const useMovieSearch = () => useAtom(movieSearch);
