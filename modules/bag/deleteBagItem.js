import { bagContent, bagCountValue } from '../../order-taking.js';
import { updateBagCount } from './updateBagCount.js';
import { updateBagPrice } from './updateBagPrice.js';
import { hideBagUI } from '../utils.js';

const deleteBagItem = (item, productTotalPrice, quantity) => {
  item.remove();
  updateBagPrice(productTotalPrice, 'decrement');
  updateBagCount(quantity, 'decrement');
  !bagCountValue && hideBagUI();
};

export function setDeleteBtn(name, totalPrice, quantity) {
  const deleteBtn = bagContent.querySelector(
    `[data-product-name="${name}"] .delete-item`
  );

  const product = deleteBtn.closest('.product-item');

  deleteBtn.addEventListener('click', () =>
    deleteBagItem(product, totalPrice, quantity)
  );
}
