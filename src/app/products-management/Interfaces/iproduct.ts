export interface IProduct {
  nameAr:string,
  nameEn:string,
  price: number,
  oldPrice: number,
  categoryId:number,
  isOffer:boolean,
  showHome:boolean,
  id:number,
  files:any,
  images:IPhotos[],
  category:ICategory[],
}
interface IPhotos{
  id: number,
  imagePath: string,
}
interface ICategory{
  id: number,
  nameAr: string,
  nameEn: string,
}
