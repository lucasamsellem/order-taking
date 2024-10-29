import { modalContent } from '../../order-taking.js';
import { burgers } from '../burgers.js';

const generateIngredient = (ingredient) => `
  <li class="ingredient-item">
    <img class="ingredient-img" src="img/${ingredient}.png" alt="${ingredient}"/>
    <h5>${ingredient}</h5>
  </li>
`;

export const displayRecipe = (burger) => {
  const ingredients = burgers[burger];
  const recipe = Object.values(ingredients).map(generateIngredient).join('');
  modalContent.innerHTML = `<ul class="recipe-container">${recipe}</ul>`;
};
