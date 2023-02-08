import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import { IProduct } from 'interfaces/products';

import { ProductItem, Item } from './ProductItem';

interface ProductStackProps {
  products: IProduct[];
  category: string;
}

export const ProductsStack = ({ products }: ProductStackProps) => {
  return (
    <Box sx={{ width: '100%' }}>
      <Stack spacing={2}>
        {products.map((item) => (
          <ProductItem
            title={item.name}
            quantity={item.availability}
            key={item.id}
          />
        ))}
        <Item key="+">+</Item>
      </Stack>
    </Box>
  );
};
