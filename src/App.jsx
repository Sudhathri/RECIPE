import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './Components/Navbar';
import RecipeList from './Components/RecipeList';
import AddRecipe from './Components/AddRecipe';
import UpdateRecipe from './Components/UpdateRecipe';

// Welcome Component
const Welcome = () => (
  <div className="welcome-container">
    <div className="text-content">
      <h1>Welcome to Recipe Discovery App!</h1>
      <p>
        Discover, create, and organize your favorite recipes. Explore delicious dishes across various
        categories like sweets, vegetarian, and non-vegetarian. Start building your personal cookbook
        today!
      </p>
      <p>Use the navigation bar to explore the app.</p>
    </div>
    <div className="image-content">
      <img src="https://i.pinimg.com/736x/74/ea/35/74ea354d34cff1664592cdc516d9b597.jpg" alt="Recipe Discovery" />
    </div>
  </div>
);


const App = () => {
  const [favorites, setFavorites] = useState([]); // Global Favorites

  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Welcome Route */}
        <Route path="/" element={<Welcome />} />

        {/* Recipe Categories */}
        
        <Route path="/sweets" element={<RecipeList category="sweets" />} />
        <Route path="/vegetarian" element={<RecipeList category="vegetarian" />} />
        <Route path="/non-vegetarian" element={<RecipeList category="non_vegetarian" />} />

        {/* Add, Update, and Favorites */}
        <Route path="/add" element={<AddRecipe />} />
        <Route path="/update/:category/:id" element={<UpdateRecipe />} />
      </Routes>
    </Router>
  );
};

export default App;
