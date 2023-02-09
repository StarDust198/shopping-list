import * as React from 'react';
import { useQuery } from '@tanstack/react-query';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
// import Button from '@mui/material/Button';

import { fetchProducts, fetchCategories } from 'api/requests';
import { ProductsStack } from './ProductsStack';

export const CategoryTabs = () => {
  const [value, setValue] = React.useState('');

  const productsQuery = useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories,
    onSuccess: (data) => {
      const newVal = Object.values(data.data)[0];
      setValue(newVal.name);
    },
  });
  // useEffect(() => setValue(categories[0].name), [categories]);

  if (productsQuery.isLoading || categoriesQuery.isLoading)
    return <h1>Loading..</h1>;
  if (productsQuery.isError || categoriesQuery.isError) return <h1>Error..</h1>;
  const products = productsQuery.data
    ? Object.values(productsQuery.data.data)
    : [];
  const categories = categoriesQuery.data
    ? Object.values(categoriesQuery.data.data)
    : [];

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      {value && (
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="Category tabs">
              {categories.map((category) => (
                <Tab
                  key={category.id}
                  label={category.name}
                  value={category.name}
                />
              ))}
            </TabList>
          </Box>
          {categories.map((category) => (
            <TabPanel key={category.id} value={category.name}>
              <ProductsStack
                category={category.name}
                products={products.filter(
                  (product) => product.category === category.name
                )}
              />
            </TabPanel>
          ))}
        </TabContext>
      )}
    </Box>
  );
};
