import React, { useState } from 'react';
import styles from './RecipeWidget.module.scss';
import { searchRecipesByIngredients, fetchRecipeDetails } from '@/utils/api';
import Modal from '@/components/Modal/Modal';

interface Recipe {
  id: number;
  image: string;
  title: string;
}

const RecipeWidget: React.FC = () => {
  const [ingredients, setIngredients] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);

  const handleSearch = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const results = await searchRecipesByIngredients(ingredients);
    setRecipes(Array.isArray(results) ? results : []);
  };

  const openRecipeDetails = async (recipeId: number) => {
    const recipeDetails = await fetchRecipeDetails(recipeId);
    setSelectedRecipe(recipeDetails);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedRecipe(null);
    setShowModal(false);
  };

  return (
    <div className={styles.recipeWidget}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          placeholder="Enter ingredients, separated by commas"
        />
        <button type="submit">Search</button>
      </form>
      <p className={styles.apiNote}>
        *If no search results show up, and the console is showing 402, then the
        daily API call limit has been reached.
      </p>
      <ul>
        {recipes.map((recipe: any) => (
          <li key={recipe.id} onClick={() => openRecipeDetails(recipe.id)}>
            <img src={recipe.image} alt={recipe.title} />
            <p>{recipe.title}</p>
          </li>
        ))}
      </ul>
      <Modal showModal={showModal} closeModal={closeModal}>
        {selectedRecipe && (
          <div className={styles.modalContent}>
            <div className={styles.imgPanel}>
              <h2>{selectedRecipe.title}</h2>
              <img
                className={styles.modalImage}
                src={selectedRecipe.image}
                alt={selectedRecipe.title}
              />
            </div>
            <div className={styles.instructions}>
              <h3>Instructions</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: selectedRecipe.instructions,
                }}
              />
              <p>
                Servings: {selectedRecipe.servings}
                <br />
                Cook Time: {selectedRecipe.readyInMinutes} minutes
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default RecipeWidget;
