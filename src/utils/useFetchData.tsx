// >>>>>>>>>>>>>>> IMPORTS <<<<<<<<<<<<<<<

// AXIOS
import axios from 'axios';
// REACT HOOKS
import { useEffect, useState } from 'react';

// CONTACT DATA INTERFACE - DEFINING DATA STRUCTURES
interface ContactData {
  login: {uuid: string};
  picture: { large: string; thumbnail: string };
  name: { first: string; last: string };
  gender: string;
  dob: { age: number };
  cell: string;
  email: string;
  location: { city: string; state: string; country: string };
}

// Exporting interface to shape contact data in components
export type Contact = ContactData;


// >>>>>>>>>>>>>>> FUNCTION COMPONENT <<<<<<<<<<<<<<<

const useFetchData = () => {
  // REACT STATE
  const [data, setData] = useState<ContactData[]>([]);
  // <ContactData[]>: This type specifies that the data state variable will hold an array of objects that conform to the ContactData interface above.
  const [isLoading, setIsLoading] = useState(true);


  // USE EFFECT

  useEffect(() => {
    // Effect triggers once when components initially render as the dependency array is is empty

    // DEFINING THE FETCH DATA FUNCTION
    const fetchData = async () => {
      try {
        // Asynchronously calling axios to fetch the API data
        // const response = await axios.get(
        //   'https://randomuser.me/api/?results=50'
        // );
        const response = await axios.get(
          'https://randomuser.me/api/?page=5&results=10&seed=abc'
        );

        // Setting data state variable with data from API
        setData(response.data.results);
        console.log(response.data.results);

        // ERROR HANDLING
      } catch (error) {
        console.error(error);
  
      } finally {
        /* The "FINALLY" code block guarantees that the below code will always run regardless of the success or fail of "try" and "catch" code blocks. 
        >>
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        << */

        // Set loading to false after the "catch" and "try" code blocks have run.
        setIsLoading(false);
      }
    };

    // Instantiating the fetchData function
    fetchData();

    // Defining an empty array as the useEffects second parameter
  }, []);

  // Returning the data and isLoading state which is updated by the fetchData function. (allows other components to consume this data and loading state)
  return { data, isLoading, setData };
};

export default useFetchData;
