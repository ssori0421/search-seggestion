import { useCallback, useEffect, useState } from 'react';
import getDisease from '../services/getDisease.ts';
import { IDisease } from '../types/disease.ts';

function Search() {
  const [searchDisease, setSearchDisease] = useState<string>('');
  const [suggestDiseaseList, setSuggestDiseaseList] = useState<IDisease[]>();

  const onChangeInputDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchDisease(value);
  };

  const getDiseaseList = useCallback(async () => {
    if (searchDisease === '') {
      setSuggestDiseaseList(undefined);
      return;
    }
    try {
      const data = await getDisease(searchDisease);
      setSuggestDiseaseList(data);
    } catch (error) {
      console.error(error);
      setSuggestDiseaseList(undefined);
    }
  }, [searchDisease]);

  useEffect(() => {
    getDiseaseList();
  }, [getDiseaseList]);

  return (
    <div>
      <input onChange={onChangeInputDisease} />
    </div>
  );
}

export default Search;
