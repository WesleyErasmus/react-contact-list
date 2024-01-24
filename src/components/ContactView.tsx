// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// STYLESHEET
import '../styles/contactView.css';

// MUI
import {
  Button,
  ButtonGroup,
  Dialog,
  IconButton,
  Card,
  CardContent,
  CardMedia,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Email, Phone } from '@mui/icons-material';

// CONTACT TYPE IMPORT
import { Contact } from '../utils/useFetchData';

// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

// Receiving contact and close dialog props from parent ContactList.tsx component as params
const ContactView = ({ contact, onClose }: {contact: Contact; onClose: () => void}) => {
  return (
    <>
      {/* !! (double-bang) operator turns any value into a boolean (true or false) */}
      <Dialog
        // Passing contact data as a truthy to trigger open dialog
        open={!!contact}
        // receiving onCLose function from props
        onClose={onClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        {/* CARD */}
        <Card
          sx={{
            width: 343,
            maxWidth: '100%',
            borderRadius: 'none',
            padding: 1.7,
            paddingTop: 3,
            boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
            textAlign: 'center',
            border: 'none',
          }}
        >
          {/* CLOSE DIALOG BUTTON */}
          <IconButton
            aria-label='close'
            // receiving onCLose function from props
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          {/* CONTACT PICTURE */}
          <CardMedia
            image={contact.picture.large}
            sx={{
              margin: 'auto',
              borderRadius: '50%',
              width: 175,
              height: 175,
              backgroundColor: 'rgba(0,0,0,0.08)',
            }}
          />
          {/* CARD BODY */}
          <CardContent sx={{ padding: 0.5 }}>
            {/* CONTACT FULL NAME */}
            <div className='contact-view-subtitle'>
              {contact.name.first} {contact.name.last}
            </div>
            {/* CONTACT LOCATION */}
            <div className='contact-view-title'>
              {' '}
              {contact.location.country}
            </div>
            {/* CONTACT EMAIL */}
            <div className='contact-view-text-body'>{contact.email}</div>
            {/* CONTACT PHONE */}
            <div className='contact-view-text-body'>{contact.cell}</div>
            {/* CARD DIVIDER */}
            <div className='contact-view-divider'></div>
            <ButtonGroup
              variant='text'
              size='medium'
              aria-label='text button group'
              sx={{ border: '#fff solid 1px !important' }}
            >
              {/* CALL BUTTON */}
              <Button
                sx={{
                  paddingX: 3,
                  color: '#f50057',
                  border: '#fff solid 1px !important',
                }}
                startIcon={<Phone />}
              >
                Call
              </Button>
              {/* EMAIL BUTTON */}
              <Button
                sx={{ paddingX: 3, color: '#f50057' }}
                startIcon={<Email />}
              >
                Email
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      </Dialog>
    </>
  );
};

export default ContactView;
