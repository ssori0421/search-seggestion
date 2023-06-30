import { useQuery } from '@tanstack/react-query';
import useDebounce from '../../../hooks/useDebounce.ts';
import styles from './suggestionList.module.scss';
import getDisease from '../../../services/getDisease.ts';
import { IDisease } from '../../../types/disease.ts';

function SuggestionList({ searchInput }: { searchInput: string }) {
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

  return (
    <div className={styles.suggestDiseaseListContainer}>
      {suggestDiseaseList && (
        <>
          <span>추천 검색어</span>
          <ul className={styles.suggestDiseaseList}>
            {suggestDiseaseList?.map((disease: IDisease) => (
              <li key={disease.id}>{disease.name}</li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default SuggestionList;
