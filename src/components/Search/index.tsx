import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getDisease from '../../services/getDisease.ts';
import { IDisease } from '../../types/disease.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import './search.scss';

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const debounceInput = useDebounce(searchInput);

  const {
    data: suggestDiseaseList,
    isLoading,
    isError,
    error,
  } = useQuery<IDisease[], Error>(
    ['diseases', debounceInput],
    () => getDisease(debounceInput) as Promise<IDisease[]>,
    {
      enabled: debounceInput !== '', // 쿼리 활성화 여부 설정
      staleTime: 60000, // 1분이 지나면 stale 해짐
      cacheTime: 300000, // 캐시 시간 (5분)
    }
  );

  const onChangeInputDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };

  return (
    <div className="searchContainer">
      <input onChange={onChangeInputDisease} />
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error: {error.message}</div>}
      {suggestDiseaseList && (
        <ul>
          {suggestDiseaseList?.map((disease: IDisease) => (
            <li key={disease.id}>{disease.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Search;
