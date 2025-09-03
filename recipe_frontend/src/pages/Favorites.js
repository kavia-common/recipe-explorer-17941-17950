import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiGetRecipes } from '../services/api';
import RecipeList from '../components/RecipeList';

// PUBLIC_INTERFACE
export default function Favorites() {
  /** Favorites page showing favorite recipes grid. */
  const { user, favorites } = useApp();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return setRecipes([]);
      const all = await apiGetRecipes();
      setRecipes(all.filter(r => favorites.includes(r.id)));
    };
    load();
  }, [user, favorites]);

  if (!user) return <div className="container" style={{ padding: 24 }}>Please sign in to view favorites.</div>;

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2 className="section-title">Your Favorites</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
}
