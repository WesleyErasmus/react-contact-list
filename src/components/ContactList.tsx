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
  ListItemAvatar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';

// MUI ICONS
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';


// COMPONENT IMPORTS
import SkeletonContactList from './SkeletonContactList';
import ContactView from './ContactView';


// STATE HOOK
import { useState } from 'react';
import MobileBottomNavbar from './MobileBottomNavbar';
import TopNavbar from './TopNavbar';
import NavFilterMenu from './NavFilterMenu';

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const ContactList = () => {
  const { data, isLoading } = useFetchData();

  // STATE
  // SINGLE CONTACT VIEW
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  // SELECTED CONTACTS LIST VIEW
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);


  const handleContactSelection = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contact)) {
        return prevSelectedContacts.filter((c) => c !== contact);
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  const clearSelectedContacts = () => {
    setSelectedContacts([]);
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
        {/* Top Navbar */}
        <TopNavbar />

        <NavFilterMenu
          clearSelectedContacts={clearSelectedContacts}
          selectedContacts={selectedContacts}
        />
        <Box
          component='main'
          className='contact-list-padding-wrapper'
          sx={{ flexGrow: 1, p: 3 }}
        >
          {/* LIST CONTAINER */}
          <List
            className='contact-list-container'
            sx={{
              width: '100%',
              minWidth: 320,
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
                          sx={{ marginRight: 1 }}
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
                          sx={{ marginLeft: 1, marginRight: 2 }}
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
        </Box>
        {/* Shorthand conditional rendering that displays the modal if the selected contact is not null */}
        {selectedContact && (
          // Passing contact data and the handle close dialog function through props to ContactView.
          <ContactView contact={selectedContact} onClose={handleCloseDialog} />
        )}
      </Box>
      {/* Mobile Navbar */}
      <div className='mobile-navbar-visibility'>
        <MobileBottomNavbar
          clearSelectedContacts={clearSelectedContacts}
          selectedContacts={selectedContacts}
        />
      </div>
    </>
  );
};

export default ContactList;
