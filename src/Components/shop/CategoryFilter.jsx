export default function CategoryFilter({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-filter-container">
      {categories.map((category) => (
        <button
          key={category.name}
          className={`category-btn ${selectedCategory === category.name ? "active" : ""}`}
          onClick={() => onSelectCategory(category.name)}
        >
           {category.name} ({category.count})
        </button>
      ))}
    </div>
  );
}
