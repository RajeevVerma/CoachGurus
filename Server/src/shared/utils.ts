
import { v1 } from "uuid";

export const uniqueIdGenerator = (prefix: string): string => {
    return `${prefix}-${v1()}`;
}