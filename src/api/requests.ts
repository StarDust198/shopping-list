import { axiosIns } from './axiosIns';
import {
  IProduct,
  IProductBase,
  IProductCategory,
  IProductCategoryBase,
} from 'interfaces/products';

export const addProduct = (product: IProduct) =>
  axiosIns.put<IProduct>(`products/${product.id}.json`, product);

export const deleteProduct = (id: string) =>
  axiosIns.delete(`products/${id}.json`);

export const fetchProducts = () => axiosIns.get<IProductBase>(`products.json`);

export const addCategory = (category: IProductCategory) =>
  axiosIns.put<IProduct>(`products/${category.id}.json`, category);

export const deleteCategory = (id: string) =>
  axiosIns.delete(`categories/${id}.json`);

export const fetchCategories = () =>
  axiosIns.get<IProductCategoryBase>(`categories.json`);
