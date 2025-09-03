import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import './recipe-card.css';

// PUBLIC_INTERFACE
export default function RecipeCard({ recipe }) {
  /** Card UI for a recipe with favorite and add-to-collection quick actions. */
  const { user, favorites, actions } = useApp();
  const isFav = favorites.includes(recipe.id);

  return (
    <article className="recipe-card card">
      <Link to={`/recipe/${recipe.id}`} className="image-wrap">
        <img src={recipe.image} alt={recipe.title} />
        <div className="chip time">{recipe.time}m</div>
      </Link>
      <div className="meta">
        <div className="top">
          <h3 className="title">{recipe.title}</h3>
          <span className="badge primary">{recipe.cuisine}</span>
        </div>
        <div className="bottom">
          <span className="calories">{recipe.calories} kcal</span>
          <div className="actions">
            <button
              className={`icon-btn ${isFav ? 'fav' : ''}`}
              title={isFav ? 'Unfavorite' : 'Favorite'}
              onClick={() => user ? actions.toggleFavorite(recipe.id) : null}
              aria-label="Toggle favorite"
            >
              {isFav ? '♥' : '♡'}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => user ? actions.addToCollection(recipe.id) : null}
            >
              Add
            </button>
            <Link className="btn btn-accent" to={`/recipe/${recipe.id}`}>View</Link>
          </div>
        </div>
      </div>
    </article>
  );
}
