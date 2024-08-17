// ! VARIABLES

const allSections = document.querySelectorAll('.section');

// MODAL
const modal = document.querySelector('.modal');
const modalContent = document.querySelector('.modal-content');
const closeModalBtn = document.querySelectorAll('.close-modal-btn');
const recipesImgs = document.querySelectorAll('.recipe-img');
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
const bagPriceEl = document.querySelector('.bag-price');
const finalizeBtn = document.querySelector('.finalize-btn');

// Dynamic variables
let orderedProducts = {};
let totalItems = 0;
let bagPrice = 0;

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

const newCheeseBurger = new CheeseBurger(
  'Sesame bread',
  'Beef',
  'Lettuce',
  'Cheddar',
  'Tomatoes',
  'Ketchup'
);

const newVegetarianBurger = new VegetarianBurger(
  'Wholemeal bread',
  'Potato pancakes',
  'Cucumbers',
  'Lettuce',
  'Tomatoes',
  'Tartar'
);

const newChickenBurger = new ChickenBurger(
  'Sesame bread',
  'Chicken',
  'Swiss cheese',
  'Lettuce',
  'Tomatoes',
  'Barbecue'
);

// ! DOM

// Helper functions
const showEl = (el) => {
  el.classList.remove('opacity-zero');
};
const hideEl = (el) => {
  el.classList.add('opacity-zero');
};

function createErrorMsg(text, container) {
  const errorMsg = document.createElement('p');
  errorMsg.textContent = text;
  container.appendChild(errorMsg);
}

// Intersection Observer
const highlightSections = (entries) => {
  entries.forEach((entry) => {
    const section = entry.target.id;

    const navLink = document.querySelector(
      `.nav-list li a[href="#${section}"]`
    );

    // highlight nav items when observing
    entry.isIntersecting
      ? navLink.classList.add('highlighted')
      : navLink.classList.remove('highlighted');
  });
};

const sectionObserver = new IntersectionObserver(highlightSections, {
  root: null,
  threshold: 0.9,
});

allSections.forEach((section) => sectionObserver.observe(section));

// Recipes
const burgers = {
  'Cheese burger': newCheeseBurger,
  'Vegetarian burger': newVegetarianBurger,
  'Chicken burger': newChickenBurger,
};

const generateIngredient = (ingredient) => {
  // Generate ingredient HTML
  return `
    <li class="ingredient-container">
      <img class="ingredient-img" src="img/${ingredient}.png" alt="${ingredient}"/>
      <h5>${ingredient}</h5>
    </li>
  `;
};

// Display recipe function
const displayRecipe = (burgerName) => {
  // Select burger
  const ingredients = burgers[burgerName];

  // Guard clause
  if (!ingredients) return;

  // Generate recipe HTML content
  const recipe = Object.keys(ingredients)
    .map((type) => generateIngredient(ingredients[type]))
    .join('');

  // Add recipe in modal content
  modalContent.innerHTML = `
    <h3 class="product-name">${burgerName} 🍔</h3>
    <ul class="recipe-container">${recipe}</ul>
  `;

  // Show modal
  modal.showModal();

  // Hide when clicking outside modal
  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.close();
  });
};

// Open modal on click
productImg.forEach((product) => {
  product.addEventListener('click', () => {
    // Target burger name
    const burgerName = product.previousElementSibling.textContent;

    // Display recipe
    displayRecipe(burgerName);
  });
});

// Close modals
closeModalBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modal.close();
    orderReceipt.close();
  });
});

// ! BAG INTERACTION
// Round price to 2 decimals if floating number
const formatPrice = (price) =>
  !Number.isInteger(price) ? price.toFixed(2) : price;

// Update bag function
const updateBag = (quantity, name, price) => {
  price = formatPrice(price);

  // Insert div for each ordered product
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

const updateBagPrice = (price, operation = 'increment') => {
  operation === 'increment' ? (bagPrice += price) : (bagPrice -= price);
  bagPriceEl.textContent = `${formatPrice(bagPrice)}€`;
};
const updateBagCount = (quantity, operation = 'increment') => {
  operation === 'increment'
    ? (totalItems += quantity)
    : (totalItems -= quantity);
  bagCount.textContent = totalItems;
};

// Order btn
orderBtn.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    const container = btn.closest('.product-container');
    const name = container.querySelector('.product-name').textContent;
    const price = container.querySelector('.price').textContent;
    const input = container.querySelector('.product-quantity-input');
    const quantity = Number(input.value);
    const totalProductPrice = Number(price * quantity);

    // Check if input quantity is valid
    if (!isNaN(quantity) && quantity > 0) {
      showEl(bagContainer);
      showEl(bagCount);

      // Increment bag count
      updateBagCount(quantity, 'increment');

      // Highlight bag btn when ordering
      if (bagCount.textContent > 0) bagBtn.classList.add('focus');

      // Update bag content && bag price
      updateBag(quantity, name, totalProductPrice);
      updateBagPrice(totalProductPrice, 'increment');

      // Delete items //////////////////////////////////
      const deleteBtn = bagContent.querySelector(
        `[data-product-name="${name}"] .delete-item`
      );

      // Delete product item on click
      deleteBtn.addEventListener('click', () => {
        // Remove product && bag price
        deleteBtn.closest('.product-item').remove();
        updateBagPrice(totalProductPrice, 'decrement');

        // Decrement bag count in DOM
        updateBagCount(quantity, 'decrement');

        // Hide bag when empty
        if (Number(bagCount.textContent) === 0) {
          bagBtn.classList.remove('focus');
          hideEl(bagCount);
          hideEl(bagContainer);
        }
      });

      // Reset the input value
      input.value = '';
    } else {
      alert('Please enter a valid quantity');
    }
  });
});

// Hide bag btn on click
bagBtn.addEventListener('click', () => {
  bagCount.textContent > 0 && bagContainer.classList.toggle('opacity-zero');
});

// Display order receipt
finalizeBtn.addEventListener('click', async () => {
  try {
    // Get today's date
    const now = new Date();
    const date = now.toLocaleDateString();
    const time = now.toLocaleTimeString('default', {
      hour: '2-digit',
      minute: '2-digit',
    });

    // Get location
    const city = await whereAmI();

    // Display order recept
    if (!city) {
      receiptDate.innerHTML = `✔️ Order placed on: <strong>${date}</strong> at <strong>${time}</strong>`;

      // Create error position msg
      createErrorMsg('⚠️ Failed to retrieve your location', receiptContainer);
    } else {
      receiptDate.innerHTML = `✔️ Order placed on: <strong>${date}</strong> at <strong>${time}</strong> in <strong>${city}</strong>`;
    }

    receiptTotalPrice.innerHTML = `Total: <strong>${bagPriceEl.textContent}</strong>`;

    creditCard.innerHTML = `
    <ion-icon name="card-outline"></ion-icon>
    <ion-icon name="logo-paypal"/></ion-icon>
    <ion-icon name="id-card-outline"></ion-icon>
   `;

    // Show modal
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
      (err) => reject(err)
    );

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
    });
  });
}

const whereAmI = async () => {
  // Create loading msg
  let loading = true;
  const loadingMsg = document.createElement('p');
  loadingMsg.className = 'loading-msg';

  function displayLoadingMsg() {
    if (loading) {
      loadingMsg.textContent = 'Retrieving your position...';
      bagContainer.appendChild(loadingMsg);
    } else {
      loadingMsg.style.display = 'none';
    }
  }
  displayLoadingMsg();

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
    displayLoadingMsg();

    return data.results[0].country;
  } catch (error) {
    console.log(error);
  }
};
