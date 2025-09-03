import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  apiSignIn, apiSignUp,
  apiToggleFavorite, apiAddToCollection, apiRemoveFromCollection,
} from '../services/api';

// PUBLIC_INTERFACE
export const AppContext = createContext(null);

// PUBLIC_INTERFACE
export function useApp() {
  /** Access global app state and actions. */
  return useContext(AppContext);
}

// PUBLIC_INTERFACE
export function AppProvider({ children }) {
  /** Context provider that handles user auth, favorites, collection, and persisted session. */
  const [user, setUser] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [collection, setCollection] = useState([]);
  const [loading, setLoading] = useState(false);

  // restore session
  useEffect(() => {
    const raw = localStorage.getItem('recipe_user');
    if (raw) {
      const u = JSON.parse(raw);
      setUser(u);
      // For fake store, we cannot retrieve server state; assume persisted arrays exist
      setFavorites(u.favorites || []);
      setCollection(u.collection || []);
    }
  }, []);

  const signIn = async (email, password) => {
    setLoading(true);
    try {
      const profile = await apiSignIn(email, password);
      setUser(profile);
      setFavorites(profile.favorites || []);
      setCollection(profile.collection || []);
      localStorage.setItem('recipe_user', JSON.stringify(profile));
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (name, email, password) => {
    setLoading(true);
    try {
      const profile = await apiSignUp(name, email, password);
      setUser(profile);
      setFavorites(profile.favorites || []);
      setCollection(profile.collection || []);
      localStorage.setItem('recipe_user', JSON.stringify(profile));
      return profile;
    } finally {
      setLoading(false);
    }
  };

  const signOut = () => {
    setUser(null);
    setFavorites([]);
    setCollection([]);
    localStorage.removeItem('recipe_user');
  };

  const toggleFavorite = async (recipeId) => {
    if (!user) throw new Error('Not authenticated');
    const favs = await apiToggleFavorite(user.id, recipeId);
    setFavorites(favs);
    // keep a snapshot in localStorage copy
    const stored = JSON.parse(localStorage.getItem('recipe_user') || '{}');
    stored.favorites = favs;
    localStorage.setItem('recipe_user', JSON.stringify(stored));
  };

  const addToCollection = async (recipeId) => {
    if (!user) throw new Error('Not authenticated');
    const col = await apiAddToCollection(user.id, recipeId);
    setCollection(col);
    const stored = JSON.parse(localStorage.getItem('recipe_user') || '{}');
    stored.collection = col;
    localStorage.setItem('recipe_user', JSON.stringify(stored));
  };

  const removeFromCollection = async (recipeId) => {
    if (!user) throw new Error('Not authenticated');
    const col = await apiRemoveFromCollection(user.id, recipeId);
    setCollection(col);
    const stored = JSON.parse(localStorage.getItem('recipe_user') || '{}');
    stored.collection = col;
    localStorage.setItem('recipe_user', JSON.stringify(stored));
  };

  const value = useMemo(() => ({
    user, loading, favorites, collection,
    actions: { signIn, signUp, signOut, toggleFavorite, addToCollection, removeFromCollection },
  }), [user, loading, favorites, collection]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}
