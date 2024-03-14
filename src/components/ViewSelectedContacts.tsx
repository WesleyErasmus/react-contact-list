// MUI
import * as React from 'react';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useState } from 'react';
import Dialog, { DialogProps } from '@mui/material/Dialog';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import { Avatar, DialogTitle, ListItem, ListItemAvatar } from '@mui/material';

// STYLESHEET
import '../styles/viewSelectedContacts.css';

// DIALOGUE SLIDE DIRECTION
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});
// COMPONENT IMPORTS
import { Contact } from '../utils/useFetchData';
import ContactView from './ContactView';

// PROPS INTERFACE
interface ViewSelectedContactsProps {
  selectedContacts: Contact[];
  dialogButtonText: string;
}

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const ViewSelectedContacts: React.FC<ViewSelectedContactsProps> = ({
  selectedContacts,
  dialogButtonText,
}) => {
  // >>>>>>>>>>>>>>> STATE <<<<<<<<<<<<<<<
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  // >>>>>>>>>>>>>>> FUNCTIONS <<<<<<<<<<<<<<<

  // OPEN SELECTED CONTACTS DIALOG FUNCTION
  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // OPEN VIEW CONTACT DIALOG FUNCTION
  const handleOpenDialog = (contact: Contact) => {
    setSelectedContact(contact);
  };

  // CLOSE DIALOG
  const handleClose = () => {
    setOpen(false);
  };

  // CLOSE DIALOG FUNCTION
  const handleCloseDialog = () => {
    setSelectedContact(null);
  };

  return (
    <>
      <span onClick={handleClickOpen('paper')}>
        <span>{dialogButtonText}</span>
      </span>
      <Dialog
        fullScreen
        open={open}
        scroll={scroll}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar className='top-navbar' sx={{ position: 'fixed' }}>
          <DialogTitle id='scroll-dialog-title'>
            <Toolbar variant='dense' sx={{ padding: '10px 0px' }}>
              <Typography
                className='view-selected-contacts-title'
                sx={{ ml: 2, flex: 1, textAlign: 'center' }}
                variant='h4'
                component='div'
              >
                Selected Contacts
              </Typography>
              <IconButton
                edge='start'
                color='inherit'
                onClick={handleClose}
                aria-label='close'
              >
                <CloseIcon />
              </IconButton>
            </Toolbar>
          </DialogTitle>
        </AppBar>

        <div>
          <List
            sx={{
              width: '100%',
              minWidth: 370,
              maxWidth: 490,
              bgcolor: 'background.paper',
              margin: 'auto',
              marginTop: '85px',
            }}
          >
            {/* MAP THROUGH SELECTED CONTACTS ARRAY */}
            {selectedContacts.map((contact: Contact) => {
              return (
                <div key={contact.login.uuid}>
                  <ListItem
                    className='contact-list-item'
                    alignItems='flex-start'
                  />
                  {/* VIEW CONTACT BUTTON */}
                  <ListItemButton onClick={() => handleOpenDialog(contact)}>
                    <ListItemAvatar sx={{ marginRight: 2 }}>
                      {/* CONTACT IMAGE */}
                      <Avatar
                        sx={{
                          width: 56,
                          height: 56,
                        }}
                        alt={contact.name.first}
                        src={contact.picture.large}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        // CONTACT FULL NAME
                        <Typography className='contact-name-text'>
                          {contact.name.first} {contact.name.last}
                        </Typography>
                      }
                      secondary={
                        <div className='location-flex-container'>
                          <div>
                            <LocationOnIcon
                              color='primary'
                              sx={{ margin: 1 }}
                            />
                          </div>
                          <div>
                            <Typography
                              sx={{ display: 'block' }}
                              component='span'
                              variant='body2'
                              color='text.primary'
                            >
                              {/* LOCATION CITY */}
                              {contact.location.city}
                            </Typography>
                            <Typography
                              variant='caption'
                              color='text.secondary'
                            >
                              {/* LOCATION COUNTRY */}
                              {contact.location.country}
                            </Typography>
                          </div>
                        </div>
                      }
                    />
                    <IconButton
                      sx={{ color: '#f50057' }}
                      size='large'
                      aria-label='view contact'
                    >
                      <MoreHorizRoundedIcon />
                    </IconButton>
                  </ListItemButton>
                  <Divider />
                </div>
              );
            })}
            {/* SHORTHAND CONDITIONAL RENDERING THAT DISPLAYS THE MODAL IF THE SELECTED CONTACT IS NOT NULL */}
            {selectedContact && (
              // PASSING CONTACT DATA AND THE HANDLE CLOSE DIALOG FUNCTION THROUGH PROPS TO CONTACTVIEW
              <ContactView
                contact={selectedContact}
                onClose={handleCloseDialog}
              />
            )}
          </List>
        </div>
      </Dialog>
    </>
  );
};

export default ViewSelectedContacts;
