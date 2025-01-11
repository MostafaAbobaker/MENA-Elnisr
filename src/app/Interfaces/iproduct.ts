import { ICategry } from "./icategry";

export interface IProduct {
  _id: string,
  title: string,
  description: string,
  quantity: number,
  price: number,
  imageCover: string,
  category :ICategry,
  brand:any,
  subcategory:any,
  images:string[],
  ratingsAverage: number,
  ratingsQuantity: number,
  updatedAt: string,
}
