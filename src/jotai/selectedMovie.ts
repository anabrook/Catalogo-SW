import { atom, useAtom } from "jotai";

const selectedMovie = atom("");

export const useSelectedMovie = () => useAtom(selectedMovie);
