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
  Card,
  CardContent,
  Checkbox,
  Divider,
} from '@mui/material';

import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';

// COMPONENTS
import SkeletonContactList from './SkeletonContactList';
import ContactView from './ContactView';
import ViewSelectedContacts from './ViewSelectedContacts';

// STATE HOOK
import { useState } from 'react';

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
    // PAGE WRAPPER
    <div className='contact-list-page-wrapper'>
      {/* PAGE HEADING - *CONDITIONAL RENDERING* */}
      <h1 className='contact-list-page-header'>
        {isLoading ? 'Loading...' : 'Contact List'}
      </h1>

      {/* TOP NAVBAR */}
      <div className='top-navbar'>
        
        <ViewSelectedContacts
          onClick={handleLogSelectedContacts}
          selectedContacts={selectedContacts}
        />
      </div>

      {/* GRID CONTAINER */}
      <div className='contact-list-grid-container'>
        {/* Maps through API data once it has been retrieved, else displays loading message - using ternary operator */}
        {!isLoading ? (
          data.map((contact: Contact) => {
            return (
              <div key={contact.login.uuid}>
                <div>
                  {/* CARD */}
                  <Card
                    className='contact-card'
                    sx={{
                      borderRadius: '12px',
                      bgcolor: '#f5f5f5',
                      textAlign: 'center',
                      boxShadow: 'none',
                    }}
                  >
                    <div
                      className={
                        selectedContacts.includes(contact)
                          ? 'selected-contact'
                          : ''
                      }
                    >
                      {/* CARD BODY */}
                      <CardContent className='contact-card-body'>
                        <div className='card-body-inner'>
                          <div>
                            {/* CONTACT IMAGE */}
                            <Avatar
                              // Open dialog on click function
                              className='contact-list-contact-image'
                              src={contact.picture.large}
                              sx={{
                                width: 84,
                                height: 84,
                                margin: 'auto',
                              }}
                            />
                          </div>
                          <div className='card-text-content'>
                            <Box
                              className='contact-list-contact-name'
                              component='h3'
                              sx={{
                                fontSize: 14,
                                fontWeight: 'bold',
                                letterSpacing: '0.5px',
                                marginTop: 1,
                                marginBottom: 0.15,
                              }}
                            >
                              {/* CONTACT NAME */}
                              {contact.name.first} {contact.name.last}
                            </Box>
                            <Box
                              component='span'
                              sx={{
                                fontSize: 13,
                                color: 'black',
                                marginBottom: '0.875em',
                                textWrap: 'no-wrap',
                              }}
                            >
                              {/* CONTACT LOCATION */}
                              {contact.location.city},
                            </Box>
                            <Box
                              component='div'
                              sx={{
                                fontSize: 13,
                                color: 'black',
                                marginBottom: '0.35em',
                              }}
                            >
                              {/* CONTACT LOCATION */}
                              {contact.location.country}
                            </Box>
                            <span
                              className='view-contact-details-button'
                              onClick={() => handleOpenDialog(contact)}
                            >
                              <AddIcCallIcon />
                            </span>
                          </div>
                        </div>
                        <div className='select-contact-checkbox'>
                          <Checkbox
                            checked={selectedContacts.includes(contact)}
                            onChange={() => handleContactSelection(contact)}
                            icon={<RadioButtonUncheckedIcon />}
                            checkedIcon={<CheckCircleIcon />}
                          />
                        </div>
                      </CardContent>
                    </div>
                    {/* <CardActions
                      className='card-actions'
                      sx={{ justifyContent: 'flex-end' }}
                    > */}
                    {/* </CardActions> */}
                    <Divider light />{' '}
                  </Card>
                </div>
              </div>
            );
          })
        ) : (
          // LOADING SKELETON COMPONENT
          <SkeletonContactList />
        )}
      </div>
      {/* Shorthand conditional rendering that displays the modal if the selected contact is not null */}
      {selectedContact && (
        // Passing contact data and the handle close dialog function through props to ContactView.
        <ContactView contact={selectedContact} onClose={handleCloseDialog} />
      )}
    </div>
  );
};

export default ContactList;
