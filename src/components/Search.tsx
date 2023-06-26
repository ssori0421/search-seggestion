import { useCallback, useEffect, useState } from 'react';
import getDisease from '../services/getDisease.ts';
import { IDisease } from '../types/disease.ts';
import useDebounce from '../hooks/useDebounce.ts';

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const [suggestDiseaseList, setSuggestDiseaseList] = useState<IDisease[]>();

  const onChangeInputDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  const debounceInput = useDebounce(searchInput);

  const getDiseaseList = useCallback(async () => {
    if (debounceInput === '') {
      setSuggestDiseaseList(undefined);
      return;
    }
    try {
      const data = await getDisease(debounceInput);
      setSuggestDiseaseList(data);
    } catch (error) {
      console.error(error);
      setSuggestDiseaseList(undefined);
    }
  }, [debounceInput]);

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
