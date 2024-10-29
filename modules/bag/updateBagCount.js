import {
  bagCount,
  bagCountValue,
  totalItems,
  setTotalItems,
  setBagCountValue,
} from '../../order-taking.js';

export const updateBagCount = (quantity, operation = 'increment') => {
  const newTotalItems =
    operation === 'increment' ? totalItems + quantity : totalItems - quantity;

  setTotalItems(newTotalItems);
  setBagCountValue(newTotalItems);

  bagCount.textContent = bagCountValue;
};
