export default function SearchBar({ searchTerm, onSearchChange}) {
  return (
    <div className="search-bar-container">
      <input
        type="text"
        className="search-input"
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search for products..."
      />
      {searchTerm && (
        <button 
          className="clear-search-btn" 
          onClick={() => onSearchChange("")}
        >
          x
        </button>
      )}
    </div>
  );
}