export interface IOrder {
  id: number,
  clientName: string,
  address: string,
  phone: string,
  whatsApp: string,
  productId: number,
  productName: string,
  productPrice: number,
  totalOrderPrice: number,
  governorateId: number,
  governorateName: string,
  orderStatus?: number,
  notes: string,
  created:Date



}
