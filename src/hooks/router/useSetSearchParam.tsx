import { useSearchParams } from 'react-router-dom';

const useSetSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const setParam = (key: string, value: string | string[]) => {
    window.scrollTo({ top: 0 });
    if (Array.isArray(value)) {
      setSearchParams(() => {
        value.forEach((v) => searchParams.append(key, v));
        return searchParams;
      });
      return setParam;
    }

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
