type Product = {
  name: string;
  price: number;
  recipe?: string[];
};

type Menu = {
  category: string;
  products: Product[];
};

const menus: Menu[] = [
  {
    category: 'burgers',
    products: [
      {
        name: 'Cheese Burger',
        price: 5.9,
        recipe: ['Sesame bread', 'Lettuce', 'Tomatoes', 'Ketchup', 'Beef', 'Cheddar'],
      },
      {
        name: 'Vegetarian Burger',
        price: 6.5,
        recipe: [
          'Wholemeal bread',
          'Lettuce',
          'Tomatoes',
          'Tartar',
          'Potato pancakes',
          'Cucumbers',
        ],
      },
      {
        name: 'Chicken Burger',
        price: 7.0,
        recipe: ['Sesame bread', 'Lettuce', 'Tomatoes', 'Barbecue', 'Chicken', 'Swiss cheese'],
      },
    ],
  },
  {
    category: 'snacks',
    products: [
      { name: 'French fries', price: 3.9 },
      { name: 'Onion rings', price: 3.5 },
      { name: 'Nuggets', price: 4.5 },
    ],
  },
  {
    category: 'drinks',
    products: [
      { name: 'Coke', price: 1.0 },
      { name: 'Ice Tea', price: 1.5 },
      { name: 'Sprite', price: 1.5 },
    ],
  },
];

export default menus;
