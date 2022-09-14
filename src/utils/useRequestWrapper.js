import React, { useEffect, useState } from 'react';
import { request } from 'umi';
import axios from 'axios';

const useRequestWrapper = (url, params, options) => {
  // const { url, params, options } = props
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setIsLoading(true);
      try {
        let response = await axios.get(url, {
          params: params,
        });
        let data = await response.json();
        setData(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    loadData();
  }, [data]);

  return { data, url, params, loading: isLoading };
};

export default useRequestWrapper;
