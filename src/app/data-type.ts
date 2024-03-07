export interface SignUp {
  name: string;
  password: string;
  email: string;
}

export interface Login {
  email: string;
  password: string;
}

export interface Product {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number;
  quantity: undefined | number;
  productId : undefined | number;
}

export interface Cart {
  name: string;
  price: number;
  color: string;
  category: string;
  description: string;
  image: string;
  id: number | undefined;
  quantity: undefined | number;
  productId : number ;
  userId : number ;
}

export interface priceSummary{
  price : number ;
  discount : number ;
  tax : number ;
  delivery : number ;
  total : number;
}

export interface Order{
  email : string ,
  address : string ,
  contact: number,
  totalPrice : number,
  userId : number,
  id : number | undefined
}