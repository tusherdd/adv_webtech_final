import PropTypes from "prop-types";

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
}

function SearchBar({
  search,
  setSearch,
}: SearchBarProps) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search by name or major..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
}

SearchBar.propTypes = {
  search: PropTypes.string.isRequired,
  setSearch: PropTypes.func.isRequired,
};

export default SearchBar;