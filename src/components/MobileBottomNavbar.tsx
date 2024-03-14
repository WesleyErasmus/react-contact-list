// MUI
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import Paper from '@mui/material/Paper';

// STYLESHEET
import '../styles/mobileBottomNavbar.css';
// COMPONENT IMPORTS
import ViewSelectedContacts from './ViewSelectedContacts';
import { Contact } from '../utils/useFetchData';

// PROPS INTERFACE
interface MobileBottomNavbarProps {
  clearSelectedContacts: () => void;
  selectedContacts: Contact[];
}

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const MobileBottomNavbar = ({
  clearSelectedContacts,
  selectedContacts,
}: MobileBottomNavbarProps) => {
  return (
    <>
      {/* NAVBAR WRAPPER */}
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels className='bottom-mobile-navbar'>
            {/* CLEAR CONTACTS BUTTON */}
            <BottomNavigationAction
              className='mobile-nav-button'
              label='Clear Selected Contacts'
              icon={<RefreshRoundedIcon />}
              onClick={clearSelectedContacts}
            />

            {/* VIEW SELECTED CONTACTS BUTTON */}
            <BottomNavigationAction
              className='mobile-nav-button'
              label={
                <ViewSelectedContacts
                  dialogButtonText='Display Selected'
                  selectedContacts={selectedContacts}
                />
              }
              icon={<HowToRegRoundedIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};

export default MobileBottomNavbar;
