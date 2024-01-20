// Axios import
import axios from 'axios';

// React hooks
import { useEffect, useState } from 'react';

// Defining data structure
interface ContactData {
  picture: { large: string; thumbnail: string };
  name: { first: string; last: string };
  gender: string;
  dob: { age: number };
  cell: number;
  email: string;
  location: { city: string; state: string; country: string };
}

const useFetchData = () => {
  // React states

  // <ContactData[]>: This type specifies that the data state variable will hold an array of objects that conform to the ContactData interface above.
  const [data, setData] = useState<ContactData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Effect triggers once when components initially render as the dependency array is is empty
  useEffect(() => {
    // Defining the fetchData function
    const fetchData = async () => {
      try {
        // Asynchronously calling axios to fetch the API data
        const response = await axios.get('https://randomuser.me/api/');
        // Setting data state variable with data from API
        setData(response.data.results);
        console.log(response.data.results);
        // Error handling
      } catch (error) {
        console.error(error);
        /* The "finally" code block guarantees that the below code will always run regardless of the success or fail of "try" and "catch" code blocks. 
        >>
        https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch
        << */
      } finally {
        // Set loading to false after the "catch" and "try" code blocks have run.
        setIsLoading(false);
      }
    };
    // Instantiating the fetchData function
    fetchData();
    // Defining an empty array as the useEffects second parameter
  }, []);

  // Returning the data and isLoading state which is updated by the fetchData function. (allows other components to consume this data and loading state)
  return { data, isLoading };
};

export default useFetchData;
