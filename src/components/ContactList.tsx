// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// CUSTOM REACT HOOK - FETCHES API CONTACT DATA
import useFetchData from '../utils/useFetchData';
import { Contact } from '../utils/useFetchData';

// STYLESHEET
import '../styles/contactList.css';

// MUI
import { Avatar, Box, Card, CardContent, Divider } from '@mui/material';

// COMPONENTS
import SkeletonContactList from './SkeletonContactList';
import ContactView from './ContactView';

// STATE HOOK
import { useState } from 'react';

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const ContactList = () => {
  const { data, isLoading } = useFetchData();

  // STATE
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

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
                  // Open dialog on click function
                    onClick={() => handleOpenDialog(contact)}
                    className='contact-card'
                    sx={{
                      borderRadius: '12px',
                      bgcolor: '#f5f5f5',
                      textAlign: 'center',
                      boxShadow: 'none',
                    }}
                  >
                    {/* CARD BODY */}
                    <CardContent className='contact-card-body'>
                      <div>
                        {/* CONTACT IMAGE */}
                        <Avatar
                          className='contact-list-contact-image'
                          src={contact.picture.large}
                          sx={{
                            width: 60,
                            height: 60,
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
                            marginBottom: 0,
                          }}
                        >
                          {/* CONTACT NAME */}
                          {contact.name.first} {contact.name.last}
                        </Box>
                        <Box
                          className='location-text-container'
                          component='span'
                          sx={{
                            fontSize: 13,
                            color: 'grey.500',
                            marginBottom: '0.875em',
                          }}
                        >
                          {/* CONTACT LOCATION */}
                          {contact.location.country}
                        </Box>
                      </div>
                    </CardContent>
                    <Divider light />
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
