import { EndeavourCategory } from "./enums/enumTypes";

/** Represents sports like badminton, cricket or academies like tuitions, maths or cultural like singing */
export interface endeavour {
    name: string,
    id: string,
    endeavourCategory: EndeavourCategory

    thumbnailUrl?: string,
    backgroundUrl?: string,
}