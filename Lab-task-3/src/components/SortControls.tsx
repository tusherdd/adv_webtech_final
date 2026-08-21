import PropTypes from "prop-types";

interface SortControlsProps {
  sortBy: string;
  setSortBy: (value: string) => void;
}

function SortControls({
  sortBy,
  setSortBy,
}: SortControlsProps) {
  return (
    <div className="sort-controls">
      <label>Sort By: </label>

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="default">Default Order</option>
        <option value="name">Name A-Z</option>
        <option value="gpa">GPA High-Low</option>
      </select>
    </div>
  );
}

SortControls.propTypes = {
  sortBy: PropTypes.string.isRequired,
  setSortBy: PropTypes.func.isRequired,
};

export default SortControls;