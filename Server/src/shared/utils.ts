
import uuid from "uuid";

export const uniqueIdGenerator = (prefix: string): string => {
    return `${prefix}-${uuid.v1()}`;
}