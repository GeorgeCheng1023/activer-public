import { useState, useEffect } from 'react';

interface Props {
  axiosInstance: any,
  method: string,
  url: string,
  requestConfig : object,
}

const useAxios = (configObj: Props) => {
  const {
    axiosInstance,
    method,
    url,
    requestConfig = {},
  } = configObj;

  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  const [reload, setReload] = useState(0);
  const refetch = () => setReload((prev) => prev + 1);

  useEffect(() => {
    const controller = new AbortController();

    const fetchDatas = async () => {
      try {
        const res = await axiosInstance[method.toLowerCase()](url, {
          ...requestConfig,
          signal: controller.signal,
        });
        console.log(res.data);
        setResponse(res.data);
      } catch (err: any) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
        console.log(loading);
      }
    };

    fetchDatas();

    return () => controller.abort();
  }, [reload]);

  return [response, error, loading, refetch];
};

export default useAxios;
