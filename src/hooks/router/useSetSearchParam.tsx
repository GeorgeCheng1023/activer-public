import { useSearchParams } from 'react-router-dom';

const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key: string, value: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setSearchParams(
      () => {
        searchParams.set(key, value);
        return searchParams;
      },
    );
  };

  return setParam;
};

export default useSetSearchParam;
