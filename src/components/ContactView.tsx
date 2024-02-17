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
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { Email, Phone } from '@mui/icons-material';
import LocationOnIcon from '@mui/icons-material/LocationOn';

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
            width: 413,
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
              <div className='contact-view-location-flex-container'>
                <div>
                  <LocationOnIcon color='primary' sx={{ margin: 1 }} />
                </div>
                <div>
                  <Typography
                    sx={{ display: 'block' }}
                    component='span'
                    variant='body1'
                    color='text.primary'
                  >
                    {contact.location.city}
                  </Typography>
                  <Typography variant='body2' color='text.primary'>
                    {contact.location.country}
                  </Typography>
                </div>
              </div>
            </div>
            {/* CONTACT EMAIL */}
            <div className='contact-view-text-body'>Email: {contact.email}</div>
            {/* CONTACT PHONE */}
            <div className='contact-view-text-body'>Phone: {contact.cell}</div>
            {/* CARD DIVIDER */}
            <div className='contact-view-divider'></div>
            <ButtonGroup
              variant='text'
              size='large'
              aria-label='text button group'
              sx={{ border: '#fff solid 1px !important' }}
            >
              {/* CALL BUTTON */}
              <Button
                sx={{
                  paddingX: 3,
                  color: '#f50057;',
                  border: '#fff solid 1px !important',
                }}
                startIcon={<Phone />}
              >
                Call
              </Button>
              {/* EMAIL BUTTON */}
              <Button
                sx={{ paddingX: 3, color: '#f50057;' }}
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
