import { bagBtn, bagCount, bagContainer } from '../order-taking.js';

export const addCSSProperty = (el, property) => el.classList.add(property);

export const removeCSSProperty = (el, property) =>
  el.classList.remove(property);

export const toggleCSSProperty = (el, property) =>
  el.classList.toggle(property);

export const scaleUpDown = (el) => {
  removeCSSProperty(el, 'scale-up');
  setTimeout(() => addCSSProperty(el, 'scale-up'), 10);
};

export const showBagUI = () => {
  removeCSSProperty(bagCount, 'opacity-zero');
  toggleCSSProperty(bagBtn, 'focus');
  toggleCSSProperty(bagContainer, 'opacity-zero');
};

export const hideBagUI = () => {
  addCSSProperty(bagCount, 'opacity-zero');
  addCSSProperty(bagContainer, 'opacity-zero');
  removeCSSProperty(bagBtn, 'focus');
};

export const formatPrice = (price) =>
  !Number.isInteger(price) ? price.toFixed(2) : price;
