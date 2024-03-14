// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// STYLESHEET
import '../styles/skeletonContactList.css';
// MUI
import { Skeleton, Box, List, ListItem } from '@mui/material';


// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const SkeletonContactList = () => {

  // NO. of placeholder skeletons
  const numberOfSkeletons = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17,
  ];

  return (
    <div className='skeleton-contact-list-backdrop'>
      <div >
        {/* MAP THROUGH numberOfSkeletons ARRAY */}
        {Array(...numberOfSkeletons).map(() => {
          return (
            <div>
              {/* CARD */}
              <List
                className='list-item-flex-container'
                sx={{
                  bgcolor: '#f5f5f5',
                  textAlign: 'center',
                  boxShadow: 'none',
                }}
              >
                <div>
                  <ListItem>
                    {/* IMAGE SKELETON */}
                    <div>
                      <Skeleton
                        sx={{ marginRight: 2, marginTop: 1 }}
                        animation='wave'
                        variant='circular'
                        width={60}
                        height={60}
                      />
                    </div>
                    <div>
                      <Box
                        sx={{
                          marginBottom: 1.5,
                        }}
                      >
                        {/* TEXT SKELETON */}
                        <Skeleton
                          animation='wave'
                          variant='rectangular'
                          width={135}
                          height={20}
                        />
                      </Box>
                      <Box
                        component='span'
                        sx={{
                          marginBottom: '0.875em',
                        }}
                      >
                        {/* TEXT SKELETON */}
                        <Skeleton
                          sx={{
                            marginBottom: '0.2em',
                          }}
                          animation='wave'
                          variant='rectangular'
                          width={105}
                          height={10}
                        />
                        <Skeleton
                          animation='wave'
                          variant='rectangular'
                          width={105}
                          height={10}
                        />
                      </Box>
                    </div>
                  </ListItem>
                </div>
                <div>
                  <Skeleton
                    sx={{ marginRight: 2 }}
                    animation='wave'
                    variant='circular'
                    width={20}
                    height={20}
                  />
                </div>
              </List>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default SkeletonContactList;
