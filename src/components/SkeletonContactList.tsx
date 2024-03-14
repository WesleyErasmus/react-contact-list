// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// STYLESHEET
import '../styles/contactList.css';
// MUI
import { Skeleton, Card, CardContent, Box, Divider } from '@mui/material';


// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const SkeletonContactList = () => {

  // NO. of placeholder skeletons
  const numberOfSkeletons = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  return (
    <div className='skeleton-contact-list-backdrop'>
      <div className='contact-list-grid-container'>
        {/* MAP THROUGH numberOfSkeletons ARRAY */}
        {Array(...numberOfSkeletons).map(() => {
          return (
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
                <CardContent className='contact-card-body'>
                  {/* IMAGE SKELETON */}
                  <div>
                    <Skeleton
                      animation='wave'
                      variant='circular'
                      width={60}
                      height={60}
                    />
                  </div>
                  <div className='card-text-content'>
                    <Box
                      className='contact-list-contact-name'
                      component='h3'
                      sx={{
                        marginTop: 1,
                        marginBottom: 0.5,
                      }}
                    >
                      {/* TEXT SKELETON */}
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={120}
                        height={20}
                      />
                    </Box>
                    <Box
                      className='location-text-container'
                      component='span'
                      sx={{
                        marginBottom: '0.875em',
                      }}
                    >
                      {/* TEXT SKELETON */}
                      <Skeleton
                        animation='wave'
                        variant='rectangular'
                        width={120}
                        height={20}
                      />
                    </Box>
                  </div>
                </CardContent>
                <Divider
                  light
                  sx={{
                    border: 'none',
                  }}
                />
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkeletonContactList;
