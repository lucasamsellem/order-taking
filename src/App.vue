<script setup lang="ts">
import Header from './components/Header.vue';
import ProductCategory from './components/products/ProductCategory.vue';
import Product from './components/products/Product.vue';
import capitalizeFirstLetter from './utils/capitalizeFirstLetter';
import menu from './data/menuData';
import { reactive } from 'vue';
import type { ProductType } from './types/Product';
import Footer from './Footer.vue';

const bag = reactive<ProductType[]>([]);

const handleAddToBag = (product: ProductType) => {
  const existingProduct = bag.find((item) => item.name === product.name);
  if (existingProduct) {
    existingProduct.quantity += product.quantity;
  } else {
    bag.push(product);
  }
};
</script>

<template>
  <Header :bag="bag" />

  <main class="max-w-[75rem] mx-auto px-[3.2rem]">
    <ProductCategory
      v-for="category in menu"
      :key="category.category"
      :category="capitalizeFirstLetter(category.category)"
      :id="category.category"
    >
      <Product
        v-for="product in category.products"
        :key="product.name"
        :name="product.name"
        :type="category.category"
        :price="product.price"
        @add-to-bag="handleAddToBag"
      />
    </ProductCategory>
  </main>

  <Footer />
</template>
