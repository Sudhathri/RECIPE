import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const UpdateRecipe = () => {
  const { category, id } = useParams(); // Extract category and id from URL
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: '',
    type: category || 'sweets',
    ingredients: [{ name: '', quantity: '' }],
    instructions: [''],
    url: '',
  });

  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    // Fetch existing recipe details
    axios
      .get(`http://localhost:3000/${category}/${id}`) // Use backticks for template literals
      .then((response) => {
        const data = response.data;
        setRecipe({
          name: data.name,
          ingredients: data.ingredients,
          instructions: data.instructions,
          url: data.url,
        });
        setLoading(false); // End loading
      })
      .catch((error) => {
        console.error('Error fetching recipe:', error);
        setLoading(false);
      });
  }, [category, id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (index, field, value) => {
    const updatedIngredients = [...recipe.ingredients];
    updatedIngredients[index][field] = value;
    setRecipe({ ...recipe, ingredients: updatedIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, { name: '', quantity: '' }],
    });
  };

  const handleInstructionChange = (index, value) => {
    const updatedInstructions = [...recipe.instructions];
    updatedInstructions[index] = value;
    setRecipe({ ...recipe, instructions: updatedInstructions });
  };

  const handleAddInstruction = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, ''],
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .put(`http://localhost:3000/${category}/${id}`, recipe) // Use backticks for dynamic URL
      .then(() => {
        alert('Recipe updated successfully!');
        navigate(`/${category}`); // Use backticks for navigation URL
      })
      .catch((error) => {
        console.error('Error updating recipe:', error);
        alert('Failed to update the recipe.');
      });
  };

  if (loading) {
    return <p>Loading...</p>; // Display loading state
  }

  return (
    <div className="form-container">
      
      <h2>Update Recipe</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Recipe Name"
          value={recipe.name}
          onChange={handleChange}
          required
        />
        <h3>Ingredients</h3>
        {recipe.ingredients.map((ingredient, index) => (
          <div key={index}>
            <input
              type="text"
              placeholder="Ingredient Name"
              value={ingredient.name}
              onChange={(e) => handleIngredientChange(index, 'name', e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(e) => handleIngredientChange(index, 'quantity', e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddIngredient}>Add Ingredient</button>

        <h3>Instructions</h3>
        {recipe.instructions.map((instruction, index) => (
          <div key={index}>
            <textarea
              placeholder={`Step ${index + 1}`}
              value={instruction}
              onChange={(e) => handleInstructionChange(index, e.target.value)}
              required
            />
          </div>
        ))}
        <button type="button" onClick={handleAddInstruction}>Add Instruction</button>

        <input
          type="text"
          name="url"
          placeholder="Image URL"
          value={recipe.url}
          onChange={handleChange}
          required
        />
        <button type="submit">Update Recipe</button>
      </form>
    </div>
  );
};

export default UpdateRecipe;
