import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

interface MenuProps {
  open: boolean;
  toggleMenu: (
    open: boolean
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const Menu = ({ open, toggleMenu }: MenuProps) => {
  return (
    <Drawer anchor="left" open={open} onClose={toggleMenu(false)}>
      <Box
        sx={{ width: 250 }}
        role="presentation"
        onClick={toggleMenu(false)}
        onKeyDown={toggleMenu(false)}
      >
        <List>
          {['Shopping List', 'Todos', 'Workout', 'Notes'].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  <AddShoppingCartIcon />
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};
