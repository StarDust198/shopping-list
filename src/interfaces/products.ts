export interface IProduct {
  id: string;
  name: string;
  category: string;
  availability: number;
}

export interface IProductBase {
  [id: string]: IProduct;
}

export interface IProductCategory {
  id: string;
  name: string;
}

export interface IProductCategoryBase {
  [id: string]: IProductCategory;
}
