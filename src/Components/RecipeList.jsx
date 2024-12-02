import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../App.css';

const RecipeList = ({ category = 'sweets' }) => {
  const [recipes, setRecipes] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search bar
  const [favorites, setFavorites] = useState([]); // State for favorites

  // Load favorites from localStorage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem(`favorites-${category}`)) || [];
    setFavorites(storedFavorites);
  }, [category]);

  useEffect(() => {
    const endpointMap = {
      sweets: 'http://localhost:3000/sweets',
      vegetarian: 'http://localhost:3000/vegetarian',
      non_vegetarian: 'http://localhost:3000/non_vegetarian',
    };

    const url = endpointMap[category] || endpointMap.sweets;

    axios
      .get(url)
      .then((res) => setRecipes(res.data))
      .catch((error) => console.error('Error fetching recipes:', error));
  }, [category]);

  const handleDelete = (id) => {
    const endpointMap = {
      sweets: `http://localhost:3000/sweets/${id}`,
      vegetarian: `http://localhost:3000/vegetarian/${id}`,
      non_vegetarian: `http://localhost:3000/non_vegetarian/${id}`,
    };

    const url = endpointMap[category] || endpointMap.sweets;

    axios
      .delete(url)
      .then(() => {
        alert('Recipe deleted');
        setRecipes((prevRecipes) => prevRecipes.filter((r) => r.id !== id));
      })
      .catch((error) => console.error('Error deleting recipe:', error));
  };

  // Add to Favorites handler
  const addToFavorites = (recipe) => {
    if (!favorites.some((fav) => fav.id === recipe.id)) {
      const newFavorites = [...favorites, recipe];
      setFavorites(newFavorites);
      localStorage.setItem(`favorites-${category}`, JSON.stringify(newFavorites)); // Store to localStorage
      alert(`${recipe.name} added to favorites!`);
    } else {
      alert(`${recipe.name} is already in favorites!`);
    }
  };

  // Remove from Favorites handler
  const removeFromFavorites = (id) => {
    const updatedFavorites = favorites.filter((fav) => fav.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem(`favorites-${category}`, JSON.stringify(updatedFavorites)); // Update localStorage
    alert('Recipe removed from favorites');
  };

  // Filter recipes based on search query
  const filteredRecipes = recipes.filter((recipe) =>
    recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="recipe-container">
      <h2>
        {category === 'sweets'
          ? 'Sweet Recipes'
          : category === 'vegetarian'
          ? 'Vegetarian Recipes'
          : 'Non-Vegetarian Recipes'}
      </h2>
      
      {/* Search Bar */}
      <input
        type="text"
        placeholder="Search recipes..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{
          margin: "10px 0",
          padding: "5px",
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      <div className="recipe-grid">
        {filteredRecipes.map((recipe) => (
          <div key={recipe.id} className="recipe-card">
            <img src={recipe.url} alt={recipe.name} className="recipe-image" />
            <h3>{recipe.name}</h3>
            <p>
              <strong>Ingredients:</strong>
            </p>
            <ul>
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{`${ingredient.name} - ${ingredient.quantity}`}</li>
              ))}
            </ul>
            <p>
              <strong>Instructions:</strong>
            </p>
            <ol>
              {recipe.instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
            <div className="card-actions">
              <Link
                to={`/update/${category}/${recipe.id}`}
                className="edit-button"
              >
                Edit
              </Link>
              <button
                onClick={() => handleDelete(recipe.id)}
                className="delete-button"
              >
                Delete
              </button>
              <button
                onClick={() => addToFavorites(recipe)}
                className="favorite-button"
                style={{ marginLeft: "10px" }}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Favorites Section */}
      <div className="favorites-section">
        <h2>Favorites</h2>
        {favorites.length > 0 ? (
          <ul>
            {favorites.map((fav) => (
              <li key={fav.id}>
                {fav.name}
                <button
                  onClick={() => removeFromFavorites(fav.id)}
                  className="remove-button"
                  style={{ marginLeft: "10px" }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No favorites yet!</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;
