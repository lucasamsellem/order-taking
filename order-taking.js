const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");
const section = document.querySelector(".section");

// MODAL
const modal = document.querySelector(".modal");
const modalContent = document.querySelector(".modal-content");
const closeModalBtn = document.querySelectorAll(".close-modal-btn");
const orderReceipt = document.querySelector(".order-receipt");
const receiptContent = document.querySelector(".receipt-content");
const receiptDate = document.querySelector(".receipt-date");
const receiptTotalPrice = document.querySelector(".receipt-total-price");
const creditCard = document.querySelector(".credit-card");

// PRODUCTS
const productImg = document.querySelectorAll(".product-img");

// BAG
const orderBtn = document.querySelectorAll(".order-btn");
const bagBtn = document.querySelector(".bag-btn");
const bagCount = document.querySelector(".bag-count");
const bagContainer = document.querySelector(".bag-container");
const bagContent = document.querySelector(".bag-content");
const bagPriceEl = document.querySelector(".bag-price");
const finalizeBtn = document.querySelector(".finalize-btn");

let orderedProducts = {};
let totalItems = 0;
let bagPrice = 0;

// CLASS BURGER
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
  "Sesame bread",
  "Beef",
  "Lettuce",
  "Cheddar",
  "Tomatoes",
  "Ketchup"
);

const newVegetarianBurger = new VegetarianBurger(
  "Wholemeal bread",
  "Potato pancakes",
  "Cucumbers",
  "Lettuce",
  "Tomatoes",
  "Tartar"
);

const newChickenBurger = new ChickenBurger(
  "Sesame bread",
  "Chicken",
  "Swiss cheese",
  "Lettuce",
  "Tomatoes",
  "Barbecue"
);

// ! DOM ////////////////////////////////

// Global functions
const hideEl = (el) => {
  el.classList.add("opacity-zero");
};

const showEl = (el) => {
  el.classList.remove("opacity-zero");
};

// Intersection Observer
const highlightSections = (entries) => {
  entries.forEach((entry) => {
    const section = entry.target.id;

    const navLink = document.querySelector(
      `.nav-list li a[href="#${section}"]`
    );

    // highlight nav items when observing
    entry.isIntersecting
      ? navLink.classList.add("highlighted")
      : navLink.classList.remove("highlighted");
  });
};

const sectionObserver = new IntersectionObserver(highlightSections, {
  root: null,
  threshold: 0.8,
});

allSections.forEach((section) => sectionObserver.observe(section));

// Recipes
const burgers = {
  "Cheese burger": newCheeseBurger,
  "Vegetarian burger": newVegetarianBurger,
  "Chicken burger": newChickenBurger,
};

const generateIngredient = (ingredient) => {
  // Generate ingredient HTML
  return `
    <li class="ingredient-container">
      <img class="ingredient-img" src="/img/${ingredient}.png" alt="${ingredient}"/>
      <span>${ingredient}</span>
    </li>
  `;
};

// Display recipe function
const displayRecipe = (burger) => {
  // Select burger
  const ingredients = burgers[burger];

  // Guard clause
  if (!ingredients) return;

  // Generate recipe HTML content
  const recipe = Object.keys(ingredients)
    .map((type) => generateIngredient(ingredients[type]))
    .join("");

  // Add recipe in modal content
  modalContent.innerHTML = `
    <h3 class="product-name">${burger}</h3>
    <ul class="recipe-container">${recipe}</ul>
  `;

  // Show modal
  modal.showModal();

  // Hide ingredient container if isn't part of the recipe
  modalContent.querySelectorAll(".recipe-img").forEach((img) => {
    img.addEventListener("error", () => {
      img.parentElement.style.display = "none";
    });
  });

  // Hide when clicking outside modal
  modal.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target === modal) modal.close();
  });
};

// Open modal on click
productImg.forEach((product) => {
  product.addEventListener("click", () => {
    // Target burger name
    const burgerName = product
      .closest(".product-container")
      .querySelector(".product-name").textContent;

    // Display recipe
    displayRecipe(burgerName);
  });
});

// Close modals
closeModalBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    modal.close();
    orderReceipt.close();
  });
});

// ! BAG INTERACTION

// Update bag function
const updateBagElements = (quantity, name, price) => {
  // Insert div for each ordered product
  bagContent.insertAdjacentHTML(
    "beforeend",
    `<ul class="data-product" data-product-name="${name}">
      <li class="product-item">
        <span><button class="delete-item">-</button></span>
        <span class="dimmed-color">${quantity}x</span> 
        <span>${name}</span>
        <span class="dimmed-color">${price}€</span>
      </li>
    </ul>`
  );
};

// Order btn clicked
orderBtn.forEach((btn) => {
  btn.addEventListener("mouseover", () => {
    // Target quantity input
    const input = btn.nextElementSibling;

    // Show input field on mouseover
    showEl(input);

    // Hide again when hover outside parent container
    btn.closest(".product-container").addEventListener("mouseleave", () => {
      hideEl(input);
    });
  });

  // Handle order button click
  btn.addEventListener("click", () => {
    // Declare all elements
    const container = btn.closest(".product-container");
    const name = container.querySelector(".product-name").textContent;
    const price = container.querySelector(".price").textContent;
    const input = container.querySelector(".product-quantity-input");

    // Product input quantity and total price
    const quantity = +input.value;
    const totalProductPrice = +price * quantity;

    // Check if quantity is valid
    if (!isNaN(quantity) && quantity > 0) {
      // Display bag container and count
      showEl(bagContainer);
      showEl(bagCount);

      // Increment bag count by the quantity
      bagCount.textContent = totalItems += quantity;

      // Highlight bag btn when ordering
      if (bagCount.textContent > 0) bagBtn.classList.add("focus");

      // Update bag content
      updateBagElements(quantity, name, totalProductPrice.toFixed(2));

      // Update bag price
      bagPriceEl.textContent = `${(bagPrice += totalProductPrice).toFixed(2)}€`;

      // Delete items
      const lastDeleteBtn = bagContent.querySelector(
        ".data-product:last-child .delete-item"
      );

      // Delete product item on click
      lastDeleteBtn.addEventListener("click", () => {
        // Target list
        lastDeleteBtn.closest(".product-item").remove();

        // Decrement bag price & update UI
        const newBagPrice = (bagPrice -= totalProductPrice);
        bagPriceEl.textContent = `${newBagPrice.toFixed(2)}€`;

        // Decrement bag count in DOM & update UI
        bagCount.textContent = totalItems -= quantity;

        // Hide bag when empty
        if (bagCount.textContent == 0) {
          bagBtn.classList.remove("focus");
          hideEl(bagCount);
          hideEl(bagContainer);
        }
      });

      // Reset the input value
      input.value = "";
    } else {
      alert("Please enter a valid quantity");
    }
  });
});

// Hide bag btn on click
bagBtn.addEventListener("click", () => {
  bagContainer.classList.toggle("opacity-zero");
});

// Display order receipt

finalizeBtn.addEventListener("click", () => {
  // Show modal
  orderReceipt.showModal();

  // Get today's date
  const date = new Date().toLocaleDateString();
  const time = new Date().toLocaleTimeString("default", {
    hour: "2-digit",
    minute: "2-digit",
  });

  // Display order recept
  receiptDate.innerHTML = `✔️ Order placed on: ${date} at ${time}`;

  receiptTotalPrice.innerHTML = `Total: ${bagPriceEl.textContent}`;

  creditCard.innerHTML = `
    <ion-icon name="card-outline"></ion-icon>
    <ion-icon name="logo-paypal"></ion-icon>
    <ion-icon name="id-card-outline"></ion-icon>
  `;
});

const getPosition = () => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => resolve(position),
      (err) => reject(err)
    );
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
};

const whereAmI = () => {
  getPosition()
    .then((position) => {
      const { latitude, longitude } = position.coords;

      return fetch(`https://reversegeo.com/locate/${latitude}/${longitude}`);
    })
    .then((res) => res.json())
    .then((data) => console.log(data.city));
};
whereAmI();
