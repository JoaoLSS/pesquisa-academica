import { v4 as uuid } from 'uuid';

export const genID = (arr: string[]) => [...arr, uuid()];
