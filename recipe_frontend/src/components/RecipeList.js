import React from 'react';
import RecipeCard from './RecipeCard';

// PUBLIC_INTERFACE
export default function RecipeList({ recipes }) {
  /** Grid list of recipe cards. */
  if (!recipes?.length) {
    return <div className="card" style={{ padding: 16 }}>No recipes found. Try adjusting filters.</div>;
  }
  return (
    <div className="grid recipes">
      {recipes.map(r => <RecipeCard key={r.id} recipe={r} />)}
    </div>
  );
}
