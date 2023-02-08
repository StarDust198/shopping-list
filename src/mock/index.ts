import { IProduct, IProductCategory } from 'interfaces/products';

export const products: IProduct[] = [
  {
    id: '1',
    name: 'Каша',
    category: 'Еда',
    availability: 2,
  },
  {
    id: '2',
    name: 'Сосиски',
    category: 'Еда',
    availability: 3,
  },
  {
    id: '3',
    name: 'Чай',
    category: 'Еда',
    availability: 1,
  },
  {
    id: '4',
    name: 'Овощи',
    category: 'Еда',
    availability: 0,
  },
  {
    id: '5',
    name: 'Стиральный порошок',
    category: 'Хозяйственное',
    availability: 1,
  },
];

export const categories: IProductCategory[] = [
  {
    id: '001',
    name: 'Еда',
  },
  {
    id: '002',
    name: 'Хозяйственное',
  },
];
