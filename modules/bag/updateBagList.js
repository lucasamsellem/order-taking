import { bagProductsList } from '../../order-taking.js';
import { formatPrice } from '../utils.js';

export const updateBagList = (quantity, name, price) => {
  bagProductsList.insertAdjacentHTML(
    'beforeend',
    `<li class="product-item" data-product-name="${name}">
        <button class="delete-item">-</button>
        <span class="product-quantity dimmed-color">${quantity}x</span> 
        <span>${name}</span>
        <span class="dimmed-color">${formatPrice(price)}€</span>
      </li>`
  );
};
