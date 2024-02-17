// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// CUSTOM REACT HOOK - FETCHES API CONTACT DATA
import useFetchData from '../utils/useFetchData';
import { Contact } from '../utils/useFetchData';

// STYLESHEET
import '../styles/contactList.css';

// MUI
import {
  Avatar,
  Box,
  Checkbox,
  Divider,
  ListItemAvatar,
  Toolbar,
  Typography,
  Drawer,
  AppBar,
  CssBaseline,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';

// MUI ICONS
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

// COMPONENT IMPORTS
import SkeletonContactList from './SkeletonContactList';
import ContactView from './ContactView';
import ViewSelectedContacts from './ViewSelectedContacts';

// STATE HOOK
import { useState } from 'react';

// DRAWER WIDTH
const drawerWidth = 300;


// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const ContactList = () => {
  const { data, isLoading } = useFetchData();

  // STATE
  // SINGLE CONTACT VIEW
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  // SELECTED CONTACTS LIST VIEW
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);

  /* 1. Select individual contacts
   2. select all contacts
   3. Unselect / clear all selected items
*/

  const handleLogSelectedContacts = () => {
    console.log('Selected contacts:', selectedContacts);
  };

  const handleContactSelection = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contact)) {
        return prevSelectedContacts.filter((c) => c !== contact);
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  // OPEN DIALOG FUNCTION
  const handleOpenDialog = (contact: Contact) => {
    setSelectedContact(contact);
  };

  // CLOSE DIALOG FUNCTION
  const handleCloseDialog = () => {
    setSelectedContact(null);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar
          className='top-navbar'
          position='fixed'
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
        >
          <Toolbar
            variant='dense'
            sx={{ padding: '20px 0px', justifyContent: 'center' }}
          >
            <Typography variant='h4' color='inherit' component='div'>
              Contact Directory
            </Typography>
          </Toolbar>
        </AppBar>

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
                    <InboxIcon />
                  </ListItemIcon>
                  <ViewSelectedContacts
                    dialogButtonText='Display Selected'
                    onClick={handleLogSelectedContacts}
                    selectedContacts={selectedContacts}
                  />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    <MailIcon />
                  </ListItemIcon>
                  <ListItemText primary='Clear Selected Contacts' />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>
        </Drawer>
        <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
  
            {/* LIST CONTAINER */}
              <List
              className='contact-list-container'
                sx={{
                  width: '100%',
                  minWidth: 370,
                  maxWidth: 490,
                  bgcolor: 'background.paper',
                }}
              >
                {/* Maps through API data once it has been retrieved, else displays loading message - using ternary operator */}
                {!isLoading ? (
                  data.map((contact: Contact) => {
                    return (
                      <div key={contact.login.uuid}>
                        <ListItem
                          className={`contact-list-item ${
                            selectedContacts.includes(contact)
                              ? 'selected-contact'
                              : ''
                          }`}
                          alignItems='flex-start'
                          secondaryAction={
                            <Checkbox
                              edge='end'
                              checked={selectedContacts.includes(contact)}
                              onChange={() => handleContactSelection(contact)}
                              icon={<RadioButtonUncheckedIcon />}
                              checkedIcon={<CheckCircleIcon />}
                            />
                          }
                        >
                          <ListItemButton
                          className='contact-list-item-button'
                            onClick={() => handleOpenDialog(contact)}
                          >
                            <ListItemAvatar
                            sx={{marginRight: 2}}
                            >
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
                          </ListItemButton>
                        </ListItem>
                        {/* <Divider variant='middle' component='li' /> */}
                      </div>
                    );
                  })
                ) : (
                  // LOADING SKELETON COMPONENT
                  <SkeletonContactList />
                )}
              </List>
            {/* Shorthand conditional rendering that displays the modal if the selected contact is not null */}
            {selectedContact && (
              // Passing contact data and the handle close dialog function through props to ContactView.
              <ContactView
                contact={selectedContact}
                onClose={handleCloseDialog}
              />
            )}
        </Box>
      </Box>
    </>
  );
};

export default ContactList;
