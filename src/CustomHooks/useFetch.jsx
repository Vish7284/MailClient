import { useState, useEffect } from "react";

const useFetch = (url, options = {}, interval = null) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(url, (options = {}));
      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }
      const data = await response.json();
      const loadedEmails = [];
      for (const key in data) {
        loadedEmails.push({
          id: key,
          ...data[key],
        });
      }
      console.log(loadedEmails[0]);
      setData(loadedEmails);
    } catch (error) {
      setError(error);
      console.error(error.message);
    } 
      setLoading(false);
    
  };
  useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      fetchData();
    }
    let intervalId;
    if (interval) {
      intervalId = setInterval(() => {
        if (isMounted) {
          fetchData();
        }
      }, interval);
    }
    return () => {
      isMounted = false;
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [url,  interval]);

  return { data, loading, error };
};

export default useFetch;
