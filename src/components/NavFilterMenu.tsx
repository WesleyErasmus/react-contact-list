// MUI
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';

// COMPONENT IMPORTS
import ViewSelectedContacts from './ViewSelectedContacts';
import { Contact } from '../utils/useFetchData';

// DRAWER WIDTH
const drawerWidth = 300;

// PROPS INTERFACE
interface NavFilterMenuProps {
  clearSelectedContacts: () => void;
  selectedContacts: Contact[];
}

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const NavFilterMenu = ({
  clearSelectedContacts,
  selectedContacts,
}: NavFilterMenuProps) => {
  return (
    <>
      {/* DRAWER */}
      <Drawer
        className='left-navigation-drawer'
        variant='permanent'
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
      >
        <h2 className='nav-drawer-menu-heading'>Filter Contacts</h2>
        <Box sx={{ overflow: 'auto' }}>
          <Divider />
          <List>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  <HowToRegRoundedIcon sx={{ color: '#f50057' }} />
                </ListItemIcon>
                <ListItemText
                  // VIEW SELECTED CONTACTS BUTTON
                  primary={
                    <ViewSelectedContacts
                      dialogButtonText='Display Selected'
                      selectedContacts={selectedContacts}
                    />
                  }
                />
              </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
              {/* CLEAR SELECTED CONTACTS BUTTON */}
              <ListItemButton onClick={clearSelectedContacts}>
                <ListItemIcon>
                  <RefreshRoundedIcon />
                </ListItemIcon>
                <ListItemText primary='Clear Selected Contacts' />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default NavFilterMenu;
