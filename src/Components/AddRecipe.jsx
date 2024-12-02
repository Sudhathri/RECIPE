import React, { useState } from 'react';
import axios from 'axios';
import '../App.css';

const AddRecipe = () => {
  const [name, setName] = useState('');
  const [type, setType] = useState('sweets'); // Default to 'sweets'
  const [ingredients, setIngredients] = useState([{ name: '', quantity: '' }]);
  const [instructions, setInstructions] = useState(['']);
  const [url, setUrl] = useState('');

  const handleAddIngredient = () => {
    setIngredients([...ingredients, { name: '', quantity: '' }]);
  };

  const handleIngredientChange = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const handleAddInstruction = () => {
    setInstructions([...instructions, '']);
  };

  const handleInstructionChange = (index, value) => {
    const newInstructions = [...instructions];
    newInstructions[index] = value;
    setInstructions(newInstructions);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Prepare payload as per the new JSON structure
    const newRecipe = {
      name,
      ingredients,
      instructions,
      url
    };

    const endpointMap = {
      sweets: 'sweets',
      vegetarian: 'vegetarian',
      non_vegetarian: 'non_vegetarian'
    };

    const endpoint = endpointMap[type];

    axios
      .post(`http://localhost:3000/${endpoint}`, newRecipe)
      .then(() => {
        alert('Recipe added successfully');
        setName('');
        setType('sweets'); // Reset to default type
        setIngredients([{ name: '', quantity: '' }]);
        setInstructions(['']);
        setUrl('');
      })
      .catch((error) => {
        console.error("Error adding recipe:", error);
      });
  };

  return (
    <div className="form-container">
      <h1 className="moni">Add Recipe</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Recipe Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          required
        >
          <option value="sweets">Sweets</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="non_vegetarian">Non-Vegetarian</option>
        </select>

        <h3 className="moni">Ingredients</h3>
        {ingredients.map((ingredient, index) => (
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

        <h3 className="moni">Instructions</h3>
        {instructions.map((instruction, index) => (
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
          type="url"
          placeholder="Recipe Image URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <button type="submit" className="submit-button">Add Recipe</button>
      </form>
    </div>
  );
};

export default AddRecipe;
