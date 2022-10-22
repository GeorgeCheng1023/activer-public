import { useState, useEffect } from 'react';

interface Props {
  axiosInstance: any,
  method: string,
  url: string,
  requestConfig : object,
}

const useAxiosFunc = () => {
  const [response, setResponse] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [controller, setController] = useState<any>(null);

  const axiosFetch : any = async (configObj: Props) => {
    const {
      axiosInstance,
      method,
      url,
      requestConfig = {},
    } = configObj;

    try {
      setLoading(true);
      const ctrl = new AbortController();
      setController(ctrl);
      const res = await axiosInstance[method.toLowerCase()](url, {
        ...requestConfig,
        signal: ctrl.signal,
      });
      setResponse(res.data);
      // console.log(res.data);
    } catch (err: any) {
      setError(err.message);
      // console.log(err.message);
    } finally {
      setLoading(false);
      // console.log(loading);
    }
  };

  useEffect(() => {
    console.log(controller);

    return () => controller && controller.abort();
  }, [controller]);

  return [response, error, loading, axiosFetch];
};

export default useAxiosFunc;
