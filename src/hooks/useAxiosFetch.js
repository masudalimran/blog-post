import axios from "axios";
import api from "../api/posts";

import { useState, useEffect } from "react";

export default function useAxiosFetch(dataUrl) {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;

    // Axios Cancel TO avoid error
    const source = axios.CancelToken.source();

    const fetchData = async (url) => {
      setIsLoading(true);
      try {
        const response = await api.get(url, {
          cancelToken: source.token,
        });
        if (isMounted) {
          setData(response.data);
          setFetchError(null);
        }
      } catch (error) {
        if (isMounted) {
          setFetchError(error.message);
          setData([]);
        }
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    fetchData(dataUrl);
    const cleanUp = () => {
      isMounted = false;

      // Axios Cancel TO avoid error
      source.cancel();
    };
    return cleanUp;
  }, [dataUrl]);
  return { data, fetchError, isLoading };
}
