import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import ViewSelectedContacts from "./ViewSelectedContacts";

import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import { Contact } from "../utils/useFetchData";

// DRAWER WIDTH
const drawerWidth = 300;

// Add function props to the type definition
interface NavFilterMenuProps {
  clearSelectedContacts: () => void;
  selectedContacts: Contact[];
}

const NavFilterMenu = ({
  clearSelectedContacts,
  selectedContacts,
}: NavFilterMenuProps) => {
  return (
    <>
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