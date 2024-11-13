import { showEl, showBagUI } from './modules/utils.js';
import { whereAmI } from './modules/getPosition.js';
import { displayRecipe } from './modules/receipe/displayRecipe.js';
import { updateBagList } from './modules/bag/updateBagList.js';
import { generateReceiptText } from './modules/receipe/generateReceiptText.js';
import { updateBagPrice } from './modules/bag/updateBagPrice.js';
import { updateBagCount } from './modules/bag/updateBagCount.js';
import { setDeleteBtn } from './modules/bag/deleteBagItem.js';

const allSections = document.querySelectorAll('.section');

// MODAL
const modal = document.querySelector('.modal');
export const modalContent = document.querySelector('.modal-content');
const orderReceipt = document.querySelector('.order-receipt');
const receipt = document.querySelector('.receipt');
const closeModalBtn = document.querySelectorAll('.close-modal-btn');

// MAIN
const burgersImg = document.querySelectorAll('.burger-img');
const orderBtn = document.querySelectorAll('.order-btn');
export const bagBtn = document.querySelector('.bag-btn');
export const bagPrice = document.querySelector('.bag-price');
export const bagCount = document.querySelector('.bag-count');
export const bagContainer = document.querySelector('.bag-container');
export const bagContent = document.querySelector('.bag-content');
export const bagProductsList = document.querySelector('.bag-products-list');
const finalizeBtn = document.querySelector('.finalize-btn');
export const loadingMsg = document.querySelector('.loading-msg');
const errorMsg = document.querySelector('.error-msg');
const todayDate = new Date().toLocaleDateString();
const todayTime = new Date().toLocaleTimeString('default', {
  hour: '2-digit',
  minute: '2-digit',
});

export let totalItems = 0;
export const setTotalItems = (newValue) => (totalItems = newValue);

export let bagPriceValue = Number(bagPrice.textContent);
export const setBagPriceValue = (newValue) => (bagPriceValue = newValue);

export let bagCountValue = Number(bagCount.textContent);
export const setBagCountValue = (newValue) => (bagCountValue = newValue);

// ! OBSERVER
const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const navLink = document.querySelector(
        `.nav-list li a[href="#${entry.target.id}"]`
      );

      entry.isIntersecting
        ? navLink.classList.add('highlighted')
        : navLink.classList.remove('highlighted');
    });
  },
  { root: null, threshold: 0.9 }
);

allSections.forEach((section) => sectionObserver.observe(section));

// ! EVENT LISTENERS
// Toggle bag when clicking on bag icon
bagBtn.addEventListener('click', () => {
  if (bagCountValue) showBagUI();
});

// Display receipe when clicking on burger image
burgersImg.forEach((img) => {
  img.addEventListener('click', () => {
    modal.showModal();
    const burger = img.previousElementSibling.textContent;
    displayRecipe(burger);
  });
});

closeModalBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.close();
    orderReceipt.close();
  });
});

// Hide when clicking outside modal
modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.close();
});

orderBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const container = btn.closest('.product-container');

    const productName = container.querySelector('.product-name').textContent;
    const price = container.querySelector('.price').textContent;
    const itemQuantity = Number(
      container.querySelector('.product-quantity-input').value
    );
    const productTotalPrice = Number(price * itemQuantity);

    bagCount.classList.remove('opacity-zero');
    updateBagCount(itemQuantity, 'increment');
    updateBagPrice(productTotalPrice, 'increment');
    updateBagList(itemQuantity, productName, productTotalPrice);

    setDeleteBtn(productName, productTotalPrice, itemQuantity);
  });
});

// Display order receipt
finalizeBtn.addEventListener('click', async () => {
  try {
    const location = await whereAmI();
    const locationText = location ? `in <strong>${location}</strong>` : '';
    if (!location) showEl(errorMsg, 'hidden');

    receipt.innerHTML = generateReceiptText(
      todayDate,
      todayTime,
      locationText,
      bagPriceValue
    );

    orderReceipt.showModal();
  } catch (error) {
    console.log(error);
  }
});
