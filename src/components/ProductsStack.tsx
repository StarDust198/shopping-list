import { FormEvent, MouseEvent, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ControlPointIcon from '@mui/icons-material/ControlPoint';

import { IProduct } from 'interfaces/products';
import { ProductItem, Item } from './ProductItem';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addProduct } from 'api/requests';
import { IconButton } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

interface ProductStackProps {
  products: IProduct[];
  category: string;
}

export const ProductsStack = ({ products, category }: ProductStackProps) => {
  const [newOpen, setNewOpen] = useState(false);

  const queryClient = useQueryClient();
  const newProductMutation = useMutation({
    mutationFn: (productName: string) =>
      addProduct({
        name: productName,
        availability: 0,
        category,
        id: crypto.randomUUID(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const newRef = useRef<null | HTMLInputElement>(null);

  const toggleDrawer =
    (open: boolean) => (event: KeyboardEvent | MouseEvent | FormEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as KeyboardEvent).key === 'Tab' ||
          (event as KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setNewOpen(open);
    };

  const onSubmitNew = (e: FormEvent | MouseEvent) => {
    e.preventDefault();
    if (newRef.current && newRef.current.value && newRef.current.value.trim()) {
      newProductMutation.mutate(newRef.current.value.trim());
      toggleDrawer(false)(e);
    }
  };

  return (
    <>
      <Box sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {products.map((item) => (
            <ProductItem product={item} key={item.id} />
          ))}
          <Item sx={{ display: 'flex', justifyContent: 'center' }}>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="add new product"
              sx={{ ml: 4 }}
              onClick={toggleDrawer(true)}
            >
              <ControlPointIcon />
            </IconButton>
          </Item>
        </Stack>
      </Box>
      <Drawer anchor="bottom" open={newOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}
          role="presentation"
          component="form"
          onSubmit={onSubmitNew}
        >
          <TextField
            id="outlined-basic"
            label="Новый продукт"
            variant="outlined"
            inputRef={newRef}
          />
          <Button sx={{ ml: 1 }} variant="outlined" onClick={onSubmitNew}>
            Добавить
          </Button>
        </Box>
      </Drawer>
    </>
  );
};
