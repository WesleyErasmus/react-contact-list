import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
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
import { Avatar } from '@mui/material';
import ContactView from './ContactView';

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

interface ViewSelectedContactsProps {
  // Function type for the onClick prop
  onClick: () => void;
  selectedContacts: Contact[];
}

const ViewSelectedContacts: React.FC<ViewSelectedContactsProps> = ({
  onClick,
  selectedContacts,
}) => {
  const [open, setOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const handleClickOpen = () => {
    setOpen(true);
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
      <Button variant='outlined' onClick={handleClickOpen}>
        <span onClick={onClick}>View Selected Contacts</span>
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <Typography sx={{ ml: 2, flex: 1 }} variant='h6' component='div'>
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
        </AppBar>
        <List>
          {selectedContacts.map((contact: Contact) => {
            return (
              <>
                <ListItemButton key={contact.login.uuid}>
                  <Avatar
                    // Open dialog on click function
                    className='contact-list-contact-image'
                    src={contact.picture.large}
                    sx={{
                      width: 55,
                      height: 55,
                      margin: 'auto',
                    }}
                  />
                  <ListItemText
                    primary={`${contact.name.first} ${contact.name.last}`}
                    secondary={contact.email}
                  />
                  <Button onClick={() => handleOpenDialog(contact)}>
                    View Contact
                  </Button>
                </ListItemButton>
                <Divider />
              </>
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
      </Dialog>
    </>
  );
};

export default ViewSelectedContacts;
