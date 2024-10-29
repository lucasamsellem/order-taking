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

export const burgers = {
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
