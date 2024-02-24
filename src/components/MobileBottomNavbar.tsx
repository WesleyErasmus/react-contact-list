import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RefreshRoundedIcon from '@mui/icons-material/RefreshRounded';
import HowToRegRoundedIcon from '@mui/icons-material/HowToRegRounded';
import Paper from '@mui/material/Paper';

import '../styles/mobileBottomNavbar.css'



const MobileBottomNavbar = () => {
  return (
    <>
      <Box sx={{ pb: 7 }}>
        <CssBaseline />
        <Paper
          sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }}
          elevation={3}
        >
          <BottomNavigation showLabels className='bottom-mobile-navbar'>
            <BottomNavigationAction
              className='mobile-nav-button'
              label='View Selected Contacts'
              icon={<HowToRegRoundedIcon />}
            />
            <BottomNavigationAction
              className='mobile-nav-button'
              label='Clear Selected Contacts'
              icon={<RefreshRoundedIcon />}
            />
          </BottomNavigation>
        </Paper>
      </Box>
    </>
  );
};

export default MobileBottomNavbar;
