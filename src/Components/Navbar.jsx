import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-heading">Recipes App</h1>
      </div>
      
      <ul className="navbar-right">
      
        <li>
          <Link to="/sweets">Sweets</Link>
        </li>
        <li>
          <Link to="/vegetarian">Vegetarian</Link>
        </li>
        <li>
          <Link to="/non-vegetarian">Non-Vegetarian</Link>
        </li>
        <li>
          <Link to="/add">Add Recipe</Link>
        </li>
       
      </ul>
    </nav>
  );
};

export default Navbar;

