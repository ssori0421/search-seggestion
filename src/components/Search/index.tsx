import { useState } from 'react';
import styles from './search.module.scss';
import SearchBar from './SearchBar/index.tsx';
import SearchSuggestion from './SuggestionList/index.tsx';

function Search() {
  const [searchInput, setSearchInput] = useState<string>('');
  const onChangeInputDisease = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setSearchInput(value);
  };
  return (
    <div className={styles.searchContainer}>
      <div className={styles.searchWrapper}>
        <h2 className={styles.title}>
          국내 모든 임상시험 검색하고 <br />
          온라인으로 참여하기
        </h2>
        <SearchBar onChange={onChangeInputDisease} />
        <SearchSuggestion searchInput={searchInput} />
      </div>
    </div>
  );
}

export default Search;
