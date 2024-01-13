// Axios import
import axios from 'axios';

// React hooks
import { useEffect, useState } from 'react';

interface Data {
  // API data response will go here
}

const useFetchData = () => {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/');
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return { data, isLoading };
};

export default useFetchData;
