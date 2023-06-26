import { useEffect, useState } from 'react';

const useDebounce = (input: string) => {
  const [debounceInput, setDebounceInput] = useState<string>('');

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebounceInput(input);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [input]);

  return debounceInput;
};

export default useDebounce;
