import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import { DetailedHTMLProps, HTMLAttributes, useState } from 'react';

import Rating from '@mui/material/Rating';
import PanoramaVerticalIcon from '@mui/icons-material/PanoramaVertical';
import PanoramaVerticalSelectIcon from '@mui/icons-material/PanoramaVerticalSelect';
import IconButton from '@mui/material/IconButton';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ReactNode } from 'react';

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
  title: string;
  quantity: number;
  // setNumber: () => void;
}

export const ProductItem = ({
  title,
  quantity = 0,
  ...props
}: ProductItemProps) => {
  const [rating, setRating] = useState<number | null>(quantity);

  const incRating = () => {
    if (rating === 3) return;
    setRating((rating) => (rating ? rating + 1 : 1));
  };

  const decRating = () => {
    if (!rating) return;
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
      <Box display="flex">
        <Typography variant="button">{title}</Typography>
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
            setRating(newValue);
          }}
        />
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
