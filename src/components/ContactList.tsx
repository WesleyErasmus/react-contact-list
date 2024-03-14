// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// CUSTOM REACT HOOK - FETCHES API CONTACT DATA
import useFetchData from '../utils/useFetchData';
import { Contact } from '../utils/useFetchData';
import axios from 'axios';

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
  Button,
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
  const { data, isLoading, setData } = useFetchData();

  // >>>>>>>>>>>>>>> STATE <<<<<<<<<<<<<<<

  // SINGLE CONTACT VIEW
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  // SELECTED CONTACTS LIST VIEW
  const [selectedContacts, setSelectedContacts] = useState<Contact[]>([]);
  // LOADING FOR "PAGINATION"
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  // >>>>>>>>>>>>>>> FUNCTIONS <<<<<<<<<<<<<<<

  // LOAD MORE CONTACTS FUNCTION
  const handleLoadMore = async () => {
    try {
      setIsLoadingMore(true);
      // CALCULATE CURRENT PAGE
      const currentPage = data.length / 10 + 1;
      const response = await axios.get(
        `https://randomuser.me/api/?page=${currentPage}&results=10&seed=abc`
      );
      const newData = response.data.results;
      // CONCATENATE NEW DATA TO EXISTING DATA
      setData([...data, ...newData]);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoadingMore(false);
    }
  };

  // SELECT CONTACTS FUNCTION
  const handleContactSelection = (contact: Contact) => {
    setSelectedContacts((prevSelectedContacts) => {
      if (prevSelectedContacts.includes(contact)) {
        return prevSelectedContacts.filter((c) => c !== contact);
      } else {
        return [...prevSelectedContacts, contact];
      }
    });
  };

  // CLEAR CONTACT SELECTION STATE
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
      {/* COMPONENT WRAPPER */}
      <Box sx={{ display: 'flex' }}>
        {/* TOP NAVBAR */}
        <TopNavbar />

        {/* MENU FOR DISPLAYING SELECTED CONTACTS AND CLEARING SELECTED CONTACTS */}
        <NavFilterMenu
          clearSelectedContacts={clearSelectedContacts}
          selectedContacts={selectedContacts}
        />
        {/* LIST CONTAINER */}
        <Box
          component='main'
          className='contact-list-padding-wrapper'
          sx={{ flexGrow: 1, p: 3 }}
        >
          {/* LIST */}
          <List
            className='contact-list-container'
            sx={{
              width: '100%',
              minWidth: 320,
              maxWidth: 490,
              bgcolor: 'background.paper',
            }}
          >
            {/* SHORTHAND CONDITIONAL RENDERING  */}
            {(isLoading || data.length === 0) && <SkeletonContactList />}
            {/* MAPS THROUGH API DATA ONCE IT HAS BEEN RETRIEVED, ELSE DISPLAYS LOADING MESSAGE */}
            {!isLoading &&
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
                        // SELECT CONTACT CHECKBOX
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
                      {/* OPEN CONTACT BUTTON */}
                      <ListItemButton
                        className='contact-list-item-button'
                        onClick={() => handleOpenDialog(contact)}
                      >
                        {/* CONTACT IMAGE */}
                        <ListItemAvatar sx={{ marginLeft: 1, marginRight: 2 }}>
                          <Avatar
                            sx={{
                              width: 56,
                              height: 56,
                            }}
                            alt={contact.name.first}
                            src={contact.picture.large}
                          />
                        </ListItemAvatar>
                        {/* CONTACT FULL NAME */}
                        <ListItemText
                          primary={
                            <Typography className='contact-name-text'>
                              {contact.name.first} {contact.name.last}
                            </Typography>
                          }
                          // CONTACT LOCATION
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
                                  {/* CITY */}
                                  {contact.location.city}
                                </Typography>
                                <Typography
                                  variant='caption'
                                  color='text.secondary'
                                >
                                  {/* COUNTRY */}
                                  {contact.location.country}
                                </Typography>
                              </div>
                            </div>
                          }
                        />
                      </ListItemButton>
                    </ListItem>
                  </div>
                );
              })}
            {/* // LOADING SKELETON WHILE FETCHING MORE CONTACTS */}
            {isLoadingMore && <SkeletonContactList />}
          </List>
          <div className='load-more-button-container'>
            {/* LOAD MORE BUTTON */}
            <Button
              className='load-more-button'
              variant='outlined'
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              style={{ display: data.length >= 10 ? 'block' : 'none' }}
            >
              Load More
            </Button>
          </div>
        </Box>
        {/* SHORTHAND CONDITIONAL RENDERING THAT DISPLAYS THE MODAL IF THE SELECTED CONTACT IS NOT NULL */}
        {selectedContact && (
          // PASSING CONTACT DATA AND THE HANDLE CLOSE DIALOG FUNCTION THROUGH PROPS TO CONTACTVIEW
          <ContactView contact={selectedContact} onClose={handleCloseDialog} />
        )}
      </Box>
      {/* MOBILE NAVBAR THAT DIS PLAYS ON SMALLER DEVICES */}
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
