import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Sidebar';
import RecipeList from '../components/RecipeList';
import { apiGetRecipes } from '../services/api';

// PUBLIC_INTERFACE
export default function Home() {
  /** Browse page with sidebar filters and recipe list. */
  const [filters, setFilters] = useState({ q: '', ingredients: [], cuisine: '' });
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const load = async (f = filters) => {
    setLoading(true);
    try {
      const data = await apiGetRecipes(f);
      setRecipes(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(filters); }, [filters]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container app-main">
      <Sidebar onFilter={setFilters} />
      <main>
        <div style={{ marginBottom: 16 }}>
          <h2 className="section-title">Discover Recipes</h2>
          <div className="subtitle">Search by ingredient or cuisine</div>
        </div>
        {loading ? <div className="card" style={{ padding: 16 }}>Loading...</div> : <RecipeList recipes={recipes} />}
      </main>
    </div>
  );
}
