import { useCallback, useEffect, useState } from 'react';
import getDisease from '../services/getDisease.ts';
import { IDisease } from '../types/disease.ts';

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [suggestDiseaseList, setSuggestDiseaseList] = useState<IDisease[]>();
  const [debouncedInput, setDebouncedInput] = useState<string>('');

  const onChangeInputDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const getDiseaseList = useCallback(async () => {
    if (debouncedInput === '') {
      setSuggestDiseaseList(undefined);
      return;
    }
    try {
      const data = await getDisease(debouncedInput);
      setSuggestDiseaseList(data);
    } catch (error) {
      console.error(error);
      setSuggestDiseaseList(undefined);
    }
  }, [debouncedInput]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedInput(searchInput);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [searchInput]);

  useEffect(() => {
    getDiseaseList();
  }, [getDiseaseList]);

  return (
    <div>
      <input onChange={onChangeInputDisease} />
      <ul>
        {suggestDiseaseList?.map((disease: IDisease) => (
          <li>{disease.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
