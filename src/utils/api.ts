// utils/api.ts
const API_KEY = '16f551289f9d481fad23a58398f28c0c'; // Spoonacular API
const BASE_URL = 'https://api.spoonacular.com/recipes';

export const searchRecipesByIngredients = async (ingredients: string) => {
  const response = await fetch(
    `${BASE_URL}/findByIngredients?ingredients=${ingredients}&number=10&apiKey=${API_KEY}`,
  );
  const data = await response.json();
  return data;
};


export const fetchRecipeDetails = async (recipeId: number) => {
    const response = await fetch(
      `${BASE_URL}/${recipeId}/information?includeNutrition=false&apiKey=${API_KEY}`,
    );
    const data = await response.json();
    return data;
  };