export interface Trip {
  _id?: string;
  code: string;
  name: string;
  length: number;
  start: string;          // ISO date string from API
  resort: string;
  perPerson: number;
  image: string;
  description: string;
}