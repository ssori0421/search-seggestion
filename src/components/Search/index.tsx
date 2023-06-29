import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import getDisease from '../../services/getDisease.ts';
import { IDisease } from '../../types/disease.ts';
import useDebounce from '../../hooks/useDebounce.ts';
import './search.scss';

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const debounceInput = useDebounce(searchInput);

  const { data: suggestDiseaseList } = useQuery<IDisease[], Error>(
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
      <div className="searchWrapper">
        <h2 className="title">
          국내 모든 임상시험 검색하고 <br />
          온라인으로 참여하기
        </h2>
        <div className="searchInputContainer">
          <div className="searchInutWrapper">
            <input
              className="searchInput"
              onChange={onChangeInputDisease}
              placeholder="질환명을 입력해 주세요."
            />
            <div className="sarchButton">검색</div>
          </div>
        </div>
        <div className="suggestDiseaseListContainer">
          {suggestDiseaseList && (
            <>
              <span>추천 검색어</span>
              <ul className="suggestDiseaseList">
                {suggestDiseaseList?.map((disease: IDisease) => (
                  <li key={disease.id}>{disease.name}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Search;
