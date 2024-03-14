import '../styles/topNavbar.css'

import { AppBar, Toolbar } from "@mui/material";


const TopNavbar = () => {
  return (
    <>
      <AppBar
        className='top-navbar'
        position='fixed'
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          className='app-title-container'
          variant='dense'
          sx={{ padding: '20px 0px', justifyContent: 'center' }}
        >
          <div className='app-title'>Contact Directory</div>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default TopNavbar