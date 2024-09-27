// ! VARIABLES
const allSections = document.querySelectorAll('.section');

// MODAL
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelectorAll('.close-modal-btn');
const orderReceipt = document.querySelector('.order-receipt');
const receiptContainer = document.querySelector('.receipt-content');
const receiptDate = document.querySelector('.receipt-date');
const receiptTotalPrice = document.querySelector('.receipt-total-price');
const creditCard = document.querySelector('.credit-card');

// PRODUCTS
const productImg = document.querySelectorAll('.product-img');

// BAG
const orderBtn = document.querySelectorAll('.order-btn');
const bagBtn = document.querySelector('.bag-btn');
const bagCount = document.querySelector('.bag-count');
const bagContainer = document.querySelector('.bag-container');
const bagContent = document.querySelector('.bag-content');
const bagProductsList = document.querySelector('.bag-products-list');
const bagPrice = document.querySelector('.bag-price');
const finalizeBtn = document.querySelector('.finalize-btn');
const now = new Date();
const date = now.toLocaleDateString();
const time = now.toLocaleTimeString('default', {
  hour: '2-digit',
  minute: '2-digit',
});

let orderedProducts = {};
let totalItems = 0;
let bagPriceValue = Number(bagPrice.textContent);
let bagCountValue = Number(bagCount.textContent);

// ! CLASS BURGER
class Burger {
  constructor(bread, lettuce, tomatoes, sauce) {
    this.bread = bread;
    this.lettuce = lettuce;
    this.tomatoes = tomatoes;
    this.sauce = sauce;
  }
}

class CheeseBurger extends Burger {
  constructor(bread, meat, lettuce, cheese, tomatoes, sauce) {
    super(bread, lettuce, tomatoes, sauce);

    this.meat = meat;
    this.cheese = cheese;
  }
}

class VegetarianBurger extends Burger {
  constructor(bread, protein, vegetable, lettuce, tomatoes, sauce) {
    super(bread, lettuce, tomatoes, sauce);

    this.protein = protein;
    this.vegetable = vegetable;
  }
}

class ChickenBurger extends Burger {
  constructor(bread, meat, cheese, lettuce, tomatoes, sauce) {
    super(bread, lettuce, tomatoes, sauce);

    this.meat = meat;
    this.cheese = cheese;
  }
}

const burgers = {
  'Cheese burger': new CheeseBurger(
    'Sesame bread',
    'Beef',
    'Lettuce',
    'Cheddar',
    'Tomatoes',
    'Ketchup'
  ),
  'Vegetarian burger': new VegetarianBurger(
    'Wholemeal bread',
    'Potato pancakes',
    'Cucumbers',
    'Lettuce',
    'Tomatoes',
    'Tartar'
  ),
  'Chicken burger': new ChickenBurger(
    'Sesame bread',
    'Chicken',
    'Swiss cheese',
    'Lettuce',
    'Tomatoes',
    'Barbecue'
  ),
};

// ! HELPER FUNCTIONS
const showEl = (el) => el.classList.remove('opacity-zero');
const hideEl = (el) => el.classList.add('opacity-zero');

const createErrorMsg = (text, container) => {
  const errorMsg = document.createElement('p');
  errorMsg.textContent = text;
  container.appendChild(errorMsg);
};

// Round price to 2 decimals if floating number
const formatPrice = (price) =>
  !Number.isInteger(price) ? price.toFixed(2) : price;

const updateBagPrice = (price, operation = 'increment') => {
  operation === 'increment'
    ? (bagPriceValue += price)
    : (bagPriceValue -= price);

  bagPrice.textContent = `${formatPrice(bagPriceValue)}€`;
};

const updateBagCount = (quantity, operation = 'increment') => {
  operation === 'increment'
    ? (totalItems += quantity)
    : (totalItems -= quantity);

  bagCount.textContent = bagCountValue = totalItems;
};

const updateBagList = (quantity, name, price) => {
  price = formatPrice(price);

  bagProductsList.insertAdjacentHTML(
    'beforeend',
    `<li class="product-item" data-product-name="${name}">
      <button class="delete-item">-</button>
      <span class="product-quantity dimmed-color">${quantity}x</span> 
      <span>${name}</span>
      <span class="dimmed-color">${price}€</span>
    </li>`
  );
};

const deleteBagItem = (item, totalProductPrice, quantity) => {
  item.remove();

  updateBagPrice(totalProductPrice, 'decrement');
  updateBagCount(quantity, 'decrement');

  if (bagCountValue === 0) {
    bagBtn.classList.remove('focus');
    hideEl(bagCount);
    hideEl(bagContainer);
  }
};

const displayLoadingMsg = (state, text, container) => {
  if (state) {
    text.textContent = 'Retrieving your position...';
    container.appendChild(text);
  } else {
    text.style.display = 'none';
  }
};

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

// ! MODAL FUNCTIONALITY
const generateIngredient = (ingredient) => `
  <li class="ingredient-container">
    <img class="ingredient-img" src="img/${ingredient}.png" alt="${ingredient}"/>
    <h5>${ingredient}</h5>
  </li>
`;

const displayRecipe = (burgerName) => {
  const ingredients = burgers[burgerName];
  if (!ingredients) return;

  const recipe = Object.values(ingredients).map(generateIngredient).join('');

  modalContent.innerHTML = `
    <h3 class="product-name">${burgerName} 🍔</h3>
    <ul class="recipe-container">${recipe}</ul>
  `;

  modal.showModal();

  // Hide when clicking outside modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
};

// ! EVENT LISTENERS

// Display receipe when clicking on burger image
productImg.forEach((product) => {
  product.addEventListener('click', () => {
    const burgerName = product.previousElementSibling.textContent;
    displayRecipe(burgerName);
  });
});

closeModalBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.close();
    orderReceipt.close();
  });
});

bagBtn.addEventListener('click', () => {
  bagCountValue > 0 && bagContainer.classList.toggle('opacity-zero');
});

orderBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();

    const container = btn.closest('.product-container');
    const name = container.querySelector('.product-name').textContent;
    const price = container.querySelector('.price').textContent;
    const itemQuantityInput = container.querySelector(
      '.product-quantity-input'
    );
    const itemQuantity = Number(itemQuantityInput.value);
    const totalProductPrice = Number(price * itemQuantity);

    if (itemQuantity > 0) {
      updateBagCount(itemQuantity, 'increment');
      updateBagPrice(totalProductPrice, 'increment');
      updateBagList(itemQuantity, name, totalProductPrice);
      showEl(bagContainer);
      showEl(bagCount);
      if (bagCountValue > 0) bagBtn.classList.add('focus');

      const deleteBtn = bagContent.querySelector(
        `[data-product-name="${name}"] .delete-item`
      );
      const item = deleteBtn.closest('.product-item');

      deleteBtn.addEventListener('click', () =>
        deleteBagItem(item, totalProductPrice, itemQuantity)
      );

      itemQuantityInput.value = '';
    } else {
      alert('Please enter a valid quantity');
    }
  });
});

// Display order receipt
finalizeBtn.addEventListener('click', async () => {
  try {
    const location = await whereAmI();
    const locationText = location ? `in <strong>${location}</strong>` : '';

    receiptDate.innerHTML = `✔️ Order placed on: <strong>${date}</strong> at <strong>${time}</strong> ${locationText}`;

    if (!location) {
      createErrorMsg('⚠️ Failed to retrieve your location', receiptContainer);
    }

    receiptTotalPrice.innerHTML = `Total: <strong>${bagPriceValue.toFixed(
      2
    )}€</strong>`;

    console.log(bagPriceValue);

    orderReceipt.showModal();
  } catch (error) {
    receiptDate.innerHTML = `Error: ${error.message}`;
  }
});

// Get current location with reverse geocoding
function getPosition() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err),
      { enableHighAccuracy: true }
    );
  });
}

const whereAmI = async () => {
  let loading = true;
  const loadingText = document.createElement('p');
  loadingText.className = 'loading-msg';
  displayLoadingMsg(loading, loadingText, bagContainer);

  try {
    const position = await getPosition();
    const { latitude, longitude } = position.coords;

    const options = {
      method: 'GET',
      headers: {
        'x-rapidapi-key': '55a99a5ab8mshb3b90b4bffb78c7p1e6180jsnb6f1a2dc3643',
        'x-rapidapi-host': 'trueway-geocoding.p.rapidapi.com',
      },
    };

    const response = await fetch(
      `https://trueway-geocoding.p.rapidapi.com/ReverseGeocode?location=${latitude}%2C-${longitude}&language=en`,
      options
    );

    const data = await response.json();

    loading = false;
    displayLoadingMsg(loading, loadingText, bagContainer);

    return data.results[0].country;
  } catch (error) {
    console.log(error);
  }
};
