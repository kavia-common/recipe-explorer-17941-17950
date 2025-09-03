import React, { useEffect, useState } from 'react';
import './sidebar.css';

// PUBLIC_INTERFACE
export default function Sidebar({ onFilter }) {
  /** Sidebar for search and filters (ingredient and cuisine). */
  const [q, setQ] = useState('');
  const [ingredientInput, setIngredientInput] = useState('');
  const [ingredients, setIngredients] = useState([]);
  const [cuisine, setCuisine] = useState('');

  useEffect(() => {
    onFilter?.({ q, ingredients, cuisine });
  }, [q, ingredients, cuisine]); // eslint-disable-line react-hooks/exhaustive-deps

  const addIngredient = () => {
    const val = ingredientInput.trim().toLowerCase();
    if (!val) return;
    if (!ingredients.includes(val)) setIngredients(i => [...i, val]);
    setIngredientInput('');
  };

  const removeIngredient = (ing) => {
    setIngredients(ings => ings.filter(i => i !== ing));
  };

  return (
    <aside className="sidebar elevated">
      <div className="sidebar-section">
        <div className="label">Search</div>
        <input
          className="input"
          placeholder="Search recipes, ingredients..."
          value={q}
          onChange={e => setQ(e.target.value)}
          aria-label="Search"
        />
      </div>

      <div className="sidebar-section">
        <div className="label">Cuisine</div>
        <select className="input" value={cuisine} onChange={e => setCuisine(e.target.value)}>
          <option value="">All cuisines</option>
          <option>Italian</option>
          <option>Indian</option>
          <option>Vietnamese</option>
          <option>Fusion</option>
        </select>
      </div>

      <div className="sidebar-section">
        <div className="label">Ingredients</div>
        <div className="row">
          <input
            className="input"
            placeholder="Add ingredient..."
            value={ingredientInput}
            onChange={e => setIngredientInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); addIngredient(); } }}
          />
          <button className="btn btn-secondary" onClick={addIngredient}>Add</button>
        </div>
        <div className="chips">
          {ingredients.map(ing => (
            <span key={ing} className="badge">
              {ing}
              <button className="chip-remove" aria-label={`Remove ${ing}`} onClick={() => removeIngredient(ing)}>×</button>
            </span>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <small className="subtitle">Tip: combine cuisine + ingredients for precise results.</small>
      </div>
    </aside>
  );
}
