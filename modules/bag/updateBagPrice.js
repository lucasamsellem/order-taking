import {
  bagPriceValue,
  setBagPriceValue,
  bagPrice,
} from '../../order-taking.js';
import { formatPrice } from '../utils.js';

export const updateBagPrice = (price, operation = 'increment') => {
  const newPrice =
    operation === 'increment' ? bagPriceValue + price : bagPriceValue - price;

  // Update the global bagPriceValue
  setBagPriceValue(newPrice);

  // Update display
  bagPrice.textContent = `${formatPrice(bagPriceValue)}€`;
};
