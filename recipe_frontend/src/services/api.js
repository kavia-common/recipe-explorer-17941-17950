const FAKE_RECIPES = [
  {
    id: 'r1',
    title: 'Spaghetti Aglio e Olio',
    cuisine: 'Italian',
    time: 20,
    calories: 450,
    ingredients: ['spaghetti', 'garlic', 'olive oil', 'chili flakes', 'parsley'],
    image: 'https://images.unsplash.com/photo-1526312426976-593c2d0fb9c8?q=80&w=1200&auto=format&fit=crop',
    steps: [
      'Boil spaghetti until al dente.',
      'Gently sauté sliced garlic in olive oil with chili flakes.',
      'Toss spaghetti with garlic oil and chopped parsley.',
      'Season and serve with grated cheese if desired.',
    ],
  },
  {
    id: 'r2',
    title: 'Chicken Tikka Masala',
    cuisine: 'Indian',
    time: 45,
    calories: 620,
    ingredients: ['chicken', 'yogurt', 'garam masala', 'tomato', 'cream', 'ginger', 'garlic'],
    image: 'https://images.unsplash.com/photo-1604908554007-066b3f6d6c33?q=80&w=1200&auto=format&fit=crop',
    steps: [
      'Marinate chicken in yogurt and spices.',
      'Grill or pan-sear until charred.',
      'Simmer tomato sauce with spices and cream.',
      'Combine with chicken and serve with rice/naan.',
    ],
  },
  {
    id: 'r3',
    title: 'Veggie Buddha Bowl',
    cuisine: 'Fusion',
    time: 25,
    calories: 380,
    ingredients: ['quinoa', 'chickpeas', 'avocado', 'spinach', 'carrot', 'tahini'],
    image: 'https://images.unsplash.com/photo-1546069901-eacef0df6022?q=80&w=1200&auto=format&fit=crop',
    steps: [
      'Cook quinoa fluffy.',
      'Roast chickpeas with spices.',
      'Arrange bowl with greens, veggies, avocado.',
      'Drizzle tahini-lemon dressing.',
    ],
  },
  {
    id: 'r4',
    title: 'Beef Pho',
    cuisine: 'Vietnamese',
    time: 120,
    calories: 550,
    ingredients: ['beef broth', 'rice noodles', 'beef', 'star anise', 'ginger', 'fish sauce'],
    image: 'https://images.unsplash.com/photo-1604908176997-4310d0fb70d0?q=80&w=1200&auto=format&fit=crop',
    steps: [
      'Simmer aromatic broth.',
      'Soak and cook rice noodles.',
      'Slice beef thinly.',
      'Assemble with herbs and lime.',
    ],
  },
];

let users = [
  // demo user
  { id: 'u1', email: 'demo@recipes.app', password: 'demo123', name: 'Demo User', favorites: ['r2'], collection: ['r1', 'r3'] }
];

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// PUBLIC_INTERFACE
export async function apiSignIn(email, password) {
  /** Sign in using fake user store. Returns user profile on success, throws on failure. */
  await delay(500);
  const user = users.find(u => u.email === email && u.password === password);
  if (!user) throw new Error('Invalid email or password');
  const { password: _pw, ...rest } = user;
  return rest;
}

// PUBLIC_INTERFACE
export async function apiSignUp(name, email, password) {
  /** Create a new user in fake user store and return profile. */
  await delay(500);
  if (users.some(u => u.email === email)) throw new Error('Email already registered');
  const newUser = { id: `u${users.length + 1}`, email, password, name, favorites: [], collection: [] };
  users.push(newUser);
  const { password: _pw, ...rest } = newUser;
  return rest;
}

// PUBLIC_INTERFACE
export async function apiGetRecipes({ q = '', ingredients = [], cuisine = '' } = {}) {
  /** Retrieve recipes filtered by free-text, ingredients, and cuisine. */
  await delay(300);
  const norm = s => s.toLowerCase().trim();
  const nq = norm(q);
  const nCuisine = norm(cuisine);

  return FAKE_RECIPES.filter(r => {
    const matchQ = !nq ||
      r.title.toLowerCase().includes(nq) ||
      r.ingredients.some(i => i.toLowerCase().includes(nq)) ||
      r.cuisine.toLowerCase().includes(nq);
    const matchCuisine = !nCuisine || r.cuisine.toLowerCase() === nCuisine;
    const matchIngredients = ingredients.length === 0 ||
      ingredients.every(i => r.ingredients.includes(norm(i)));
    return matchQ && matchCuisine && matchIngredients;
  });
}

// PUBLIC_INTERFACE
export async function apiGetRecipeById(id) {
  /** Fetch a single recipe by id. */
  await delay(200);
  return FAKE_RECIPES.find(r => r.id === id) || null;
}

// PUBLIC_INTERFACE
export async function apiToggleFavorite(userId, recipeId) {
  /** Toggle favorite for a user and return updated favorites list. */
  await delay(200);
  const u = users.find(u => u.id === userId);
  if (!u) throw new Error('User not found');
  const idx = u.favorites.indexOf(recipeId);
  if (idx >= 0) u.favorites.splice(idx, 1);
  else u.favorites.push(recipeId);
  return [...u.favorites];
}

// PUBLIC_INTERFACE
export async function apiAddToCollection(userId, recipeId) {
  /** Add a recipe to personal collection and return updated collection. */
  await delay(200);
  const u = users.find(u => u.id === userId);
  if (!u) throw new Error('User not found');
  if (!u.collection.includes(recipeId)) u.collection.push(recipeId);
  return [...u.collection];
}

// PUBLIC_INTERFACE
export async function apiRemoveFromCollection(userId, recipeId) {
  /** Remove a recipe from personal collection and return updated collection. */
  await delay(200);
  const u = users.find(u => u.id === userId);
  if (!u) throw new Error('User not found');
  u.collection = u.collection.filter(id => id !== recipeId);
  return [...u.collection];
}
