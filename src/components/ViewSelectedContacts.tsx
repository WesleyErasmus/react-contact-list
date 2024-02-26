// STYLESHEET
import '../styles/contactList.css';

import * as React from 'react';
// import Dialog from '@mui/material/Dialog';
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

// Dialogue slide direction
const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='down' ref={ref} {...props} />;
});
// CONTACT TYPE IMPORT
import { Contact } from '../utils/useFetchData';
import {
  Avatar,
  DialogTitle,
  ListItem,
  ListItemAvatar,
} from '@mui/material';
import ContactView from './ContactView';

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

interface ViewSelectedContactsProps {
  // Function type for the onClick prop

  selectedContacts: Contact[];
  dialogButtonText: string;
}

const ViewSelectedContacts: React.FC<ViewSelectedContactsProps> = ({
  selectedContacts,
  dialogButtonText,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [scroll, setScroll] = React.useState<DialogProps['scroll']>('paper');

  const handleClickOpen = (scrollType: DialogProps['scroll']) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  // OPEN DIALOG FUNCTION
  const handleOpenDialog = (contact: Contact) => {
    setSelectedContact(contact);
  };

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
        <AppBar className='top-navbar' sx={{ position: 'relative' }}>
          <DialogTitle id='scroll-dialog-title'>
            <Toolbar variant='dense' sx={{ padding: '20px 0px' }}>
              <Typography
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
            }}
          >
            {selectedContacts.map((contact: Contact) => {
              return (
                <div key={contact.login.uuid}>
                  <ListItem
                    className='contact-list-item'
                    alignItems='flex-start'
                  />
                  <ListItemButton onClick={() => handleOpenDialog(contact)}>
                    <ListItemAvatar sx={{ marginRight: 2 }}>
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
                              {contact.location.city}
                            </Typography>
                            <Typography
                              variant='caption'
                              color='text.secondary'
                            >
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
            {selectedContact && (
              // Passing contact data and the handle close dialog function through props to ContactView.
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
