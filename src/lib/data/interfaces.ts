export interface Hero {
  id: number;
  name: string;
  description: string;
  email: string;
  orders?: Order[];
  accountRep?: AccountRep;
}

export interface Order {
  heroId: number;
  num: number;
  items: Item[];
  shppingStatus: ShippingStatus;
}

export interface AccountRep {
  repId: number;
  name: string;
}

export interface ShippingStatus {
  [index: number]: ShippingStatus;
  orderNum: number;
  status: string;
}

export interface Item {
  orderNum: number;
  name: string;
  qty: number;
  price: number;
}

export interface Callback<T> {
  (data: T): void;
}

export interface CallbackError {
  (msg?: string): void;
}
