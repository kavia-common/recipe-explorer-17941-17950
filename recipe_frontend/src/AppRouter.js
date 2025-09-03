import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Collection from './pages/Collection';
import RecipeDetail from './pages/RecipeDetail';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Top-level router and app shell layout. */
  return (
    <BrowserRouter>
      <div className="app-shell">
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/favorites" element={<Favorites />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/recipe/:id" element={<RecipeDetail />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
