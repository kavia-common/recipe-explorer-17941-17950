import React, { useEffect, useState } from 'react';
import { useApp } from '../context/AppContext';
import { apiGetRecipes } from '../services/api';
import RecipeList from '../components/RecipeList';

// PUBLIC_INTERFACE
export default function Collection() {
  /** Personal collection page showing user's saved recipes. */
  const { user, collection } = useApp();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const load = async () => {
      if (!user) return setRecipes([]);
      const all = await apiGetRecipes();
      setRecipes(all.filter(r => collection.includes(r.id)));
    };
    load();
  }, [user, collection]);

  if (!user) return <div className="container" style={{ padding: 24 }}>Please sign in to view your collection.</div>;

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <h2 className="section-title">My Collection</h2>
      <RecipeList recipes={recipes} />
    </div>
  );
}
