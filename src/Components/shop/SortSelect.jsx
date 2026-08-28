export default function SortSelect({ sortBy, onSortChange }) {
  return (
    <select 
      value={sortBy} 
      onChange={(e) => onSortChange(e.target.value)}
      className="sort-select"
    >
      <option value="default">Sort by: Featured</option>
      <option value="price-low">Price: Low to High</option>
      <option value="price-high">Price: High to Low</option>
      <option value="title-az">Name: A to Z</option>
    </select>
  );
}