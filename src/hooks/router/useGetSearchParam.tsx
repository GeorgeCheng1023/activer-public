import { useSearchParams } from 'react-router-dom';

const useGetSearchParam = (key: string, defaultParams : string) : string => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParam, setSearchParams] = useSearchParams();

  return searchParam.get(key) || defaultParams;
};

export default useGetSearchParam;
