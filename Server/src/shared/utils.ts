
import { v1 } from "uuid";
import randomNumberTimeBased from "./constants/randomGenerator.utility";

export const uniqueIdGenerator = (prefix: string): string => {
    return `${prefix}${randomNumberTimeBased('')}`;
}