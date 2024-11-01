import { bagBtn, bagCount, bagContainer } from '../order-taking.js';

export const showEl = (el, property) => el.classList.remove(property);
export const hideEl = (el, property) => el.classList.add(property);

export const showBagUI = () => {
  showEl(bagCount, 'opacity-zero');
  showEl(bagContainer, 'opacity-zero');
  bagBtn.classList.add('focus');
};

export const hideBagUI = () => {
  hideEl(bagCount, 'opacity-zero');
  hideEl(bagContainer, 'opacity-zero');
  bagBtn.classList.remove('focus');
};

export const formatPrice = (price) =>
  !Number.isInteger(price) ? price.toFixed(2) : price;
