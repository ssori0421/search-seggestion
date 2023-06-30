import styles from './searchBar.module.scss';

function SearchBar({ onChange }: { onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className={styles.searchInputContainer}>
      <div className={styles.searchInutWrapper}>
        <input
          className={styles.searchInput}
          onChange={onChange}
          placeholder="질환명을 입력해 주세요."
        />
        <div className={styles.sarchButton}>검색</div>
      </div>
    </div>
  );
}

export default SearchBar;
