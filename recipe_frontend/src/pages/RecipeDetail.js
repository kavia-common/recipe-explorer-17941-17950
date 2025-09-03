import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiGetRecipeById } from '../services/api';
import { useApp } from '../context/AppContext';

// PUBLIC_INTERFACE
export default function RecipeDetail() {
  /** Recipe detail page with image, meta, ingredients and steps. */
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user, favorites, actions } = useApp();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const r = await apiGetRecipeById(id);
        setRecipe(r);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: 24 }}>Loading...</div>;
  if (!recipe) return <div className="container" style={{ padding: 24 }}>Recipe not found.</div>;

  const isFav = favorites.includes(recipe.id);

  return (
    <div className="container" style={{ padding: '24px 0' }}>
      <article className="card" style={{ overflow: 'hidden' }}>
        <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
          <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', top: 16, left: 16 }} className="badge accent">{recipe.time} min</div>
          <div style={{ position: 'absolute', top: 16, right: 16 }}>
            <button
              className={`btn ${isFav ? 'btn-accent' : 'btn-secondary'}`}
              onClick={() => user ? actions.toggleFavorite(recipe.id) : null}
            >
              {isFav ? '♥ Favorited' : '♡ Favorite'}
            </button>
          </div>
        </div>
        <div style={{ padding: 20 }}>
          <h1 style={{ margin: '0 0 4px', fontSize: 24, lineHeight: '32px' }}>{recipe.title}</h1>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: '#666' }}>
            <span className="badge primary">{recipe.cuisine}</span>
            <span>{recipe.calories} kcal</span>
          </div>

          <section style={{ marginTop: 20 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Ingredients</h3>
            <ul style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.ingredients.map(i => <li key={i}>{i}</li>)}
            </ul>
          </section>

          <section style={{ marginTop: 20 }}>
            <h3 style={{ margin: '0 0 8px', fontSize: 18 }}>Steps</h3>
            <ol style={{ margin: 0, paddingLeft: 18 }}>
              {recipe.steps.map((s, idx) => <li key={idx} style={{ marginBottom: 8 }}>{s}</li>)}
            </ol>
          </section>

          <div style={{ marginTop: 24, display: 'flex', gap: 12 }}>
            <button className="btn btn-primary" onClick={() => user ? actions.addToCollection(recipe.id) : null}>Add to My Collection</button>
          </div>
        </div>
      </article>
    </div>
  );
}
