import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Rating from '@mui/material/Rating';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaVerticalSelectIcon from '@mui/icons-material/PanoramaVerticalSelect';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import { addProduct, deleteProduct } from 'api/requests';
import { IProduct } from 'interfaces/products';

export const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

interface ProductItemProps
  extends Omit<
    DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
    'ref'
  > {
  product: IProduct;
}

export const ProductItem = ({ product, ...props }: ProductItemProps) => {
  const [rating, setRating] = useState(product.availability);

  const queryClient = useQueryClient();
  const changeMutation = useMutation({
    mutationFn: (product: IProduct) => addProduct(product),
    // onSuccess: () => {
    //   queryClient.invalidateQueries(['products']);
    // },
  });

  const deleteMutation = useMutation({
    mutationFn: (productId: string) => deleteProduct(productId),
    onSuccess: () => {
      queryClient.invalidateQueries(['products']);
    },
  });

  const incRating = () => {
    if (rating === 3) return;
    changeMutation.mutate({ ...product, availability: rating + 1 });
    setRating((rating) => (rating ? rating + 1 : 1));
  };

  const decRating = () => {
    if (!rating) return;
    changeMutation.mutate({ ...product, availability: rating - 1 });
    setRating((rating) => (rating ? rating - 1 : 0));
  };

  return (
    <Item {...props}>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ ml: 1 }}
        onClick={decRating}
      >
        <ArrowLeftIcon />
      </IconButton>
      <Box display="flex" sx={{ alignItems: 'center' }}>
        <Typography variant="button">{product.name}</Typography>
        <Rating
          sx={{ ml: 1 }}
          emptyIcon={
            <PanoramaVerticalIcon
              fontSize="inherit"
              sx={{
                fill: !rating || rating === 0 ? 'red' : null,
              }}
            />
          }
          icon={
            <PanoramaVerticalSelectIcon
              sx={{
                fill:
                  rating && rating > 2
                    ? 'green'
                    : rating && rating < 2
                    ? 'red'
                    : null,
              }}
              fontSize="inherit"
            />
          }
          max={3}
          value={rating}
          onChange={(event, newValue) => {
            if (newValue) setRating(newValue);
          }}
        />
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 1 }}
          onClick={() => deleteMutation.mutate(product.id)}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 1 }}
        onClick={incRating}
      >
        <ArrowRightIcon />
      </IconButton>
    </Item>
  );
};
