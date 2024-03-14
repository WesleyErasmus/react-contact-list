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
    // EFFECT TRIGGERS ONCE WHEN COMPONENTS INITIALLY RENDER AS THE DEPENDENCY ARRAY IS EMPTY

    // DEFINING THE FETCH DATA FUNCTION
    const fetchData = async () => {
      try {
        // ASYNCHRONOUSLY CALLING AXIOS TO FETCH THE API DATA
        const response = await axios.get(
          'https://randomuser.me/api/?page=5&results=10&seed=abc'
        );

        // SETTING DATA STATE VARIABLE WITH DATA FROM API
        setData(response.data.results);
        console.log(response.data.results);

        // ERROR HANDLING
      } catch (error) {
        console.error(error);
      } finally {
        /* THE "FINALLY" CODE BLOCK GUARANTEES THAT THE BELOW CODE WILL ALWAYS RUN REGARDLESS OF THE SUCCESS OR FAIL OF "TRY" AND "CATCH" CODE BLOCKS 
        >>
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        << */

        // SET LOADING TO FALSE AFTER THE "CATCH" AND "TRY" CODE BLOCKS HAVE RUN
        setIsLoading(false);
      }
    };

    // INSTANTIATING THE FETCHDATA FUNCTION
    fetchData();

    // DEFINING AN EMPTY ARRAY AS THE USEEFFECT'S SECOND PARAMETER
  }, []);

  // RETURNING THE DATA AND ISLOADING STATE WHICH IS UPDATED BY THE FETCHDATA FUNCTION. (ALLOWS OTHER COMPONENTS TO CONSUME THIS DATA AND LOADING STATE)
  return { data, isLoading, setData };
};

export default useFetchData;
