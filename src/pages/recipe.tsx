import React from 'react';
import Layout from '../components/Layout/Layout';
import RecipeWidget from '@/widgets/Recipe/RecipeWidget';
import styles from '../styles/recipe.module.scss';

const Recipe = () => {
  return (
    <div className={styles.recipePage}>
      <h1>Recipe Widget</h1>
      <RecipeWidget />
      <br />
      <p>
        The Recipe Widget is a handy web application built using React, Next.js,
        and TypeScript. Users can search for recipes based on the ingredients
        they have on hand. The widget fetches recipes from an external API and
        displays the search results as a list of recipe titles with
        corresponding images. Users can click on a recipe to view more details,
        such as cooking instructions, servings, and cook time.
      </p>
      <p>
        The Recipe Widget showcases my ability to create a responsive and
        user-friendly interface that interacts with external APIs. Users can
        enter a list of ingredients, separated by commas, and the widget
        searches for matching recipes using the searchRecipesByIngredients API
        call. Upon submission, a list of recipe results is displayed with images
        and titles. When a user clicks on a recipe, a custom modal component
        opens, displaying detailed information about the recipe, such as the
        image, instructions, cook time, and servings. This is achieved through
        the fetchRecipeDetails API call. This project demonstrates my skills in
        working with APIs, handling user input, managing state with React hooks,
        and creating custom React components like the Modal component.
      </p>
      <h2>Technologies Used:</h2>
      <ul>
        <li>React</li>
        <li>Next.js</li>
        <li>TypeScript</li>
        <li>Spoonacular API</li>
      </ul>
    </div>
  );
};

export default Recipe;
