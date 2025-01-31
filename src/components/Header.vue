<script setup lang="ts">
import logo from '/images/logo.svg';
import type { ProductType } from '../types/Product';
import Bag from './bag/Bag.vue';
import useToggle from '../composables/useToggle';
import { computed, ref, watch } from 'vue';

const props = defineProps<{
  bag: ProductType[];
}>();

const { state: isBagActive, toggle: toggleBag } = useToggle();
const hasItemsInBag = computed(() => props.bag.length > 0);
const itemsQuantityInBag = computed(() =>
  props.bag.reduce((total, item) => total + item.quantity, 0)
);

// Bag animation
const bagAnimationClass = ref('');
watch(props.bag, () => {
  bagAnimationClass.value = 'scale-up-down';

  // Removes class right after
  setTimeout(() => {
    bagAnimationClass.value = '';
  }, 400);
});
</script>

<template>
  <header
    class="fixed w-full top-0 flex justify-between items-center bg-beige max-[800px]:px-5 px-10 py-3 max-[800px]:py-3 font-semibold z-[999] opacity-90 max-[800px]:scroll-mt-32"
  >
    <div class="flex gap-x-5 items-center text-nowrap">
      <img :src="logo" alt="Burger Logo" class="max-[800px]:min-w-[2.2rem] max-w-[3rem]" />
      <h1 class="text-2xl font-bold max-[800px]:hidden">Burger delivery</h1>
    </div>

    <nav class="ml-auto max-[800px]:ml-0">
      <Transition>
        <ul class="flex gap-5 text-lg items-center max-[800px]:gap-0 max-[800px]:text-[1rem]">
          <li><a href="#burgers">Burgers</a></li>
          <li><a href="#snacks">Snacks</a></li>
          <li><a href="#drinks">Drinks</a></li>
        </ul>
      </Transition>
    </nav>

    <Transition name="fade">
      <button
        @click="toggleBag"
        :class="`relative flex ml-10 text-3xl max-[800px]:text-[1.7rem] cursor-pointer max-[800px]:ml-0 ${bagAnimationClass} ${
          isBagActive && hasItemsInBag ? 'text-[orange]' : ''
        } `"
      >
        <ion-icon name="bag-outline" />
        <span
          v-if="hasItemsInBag"
          class="absolute text-sm max-[800px]:text-[0.8rem] bottom-3 left-4 max-[800px]:left-3 max-[800px]:bottom-[0.6rem] bg-red-500 text-white px-[0.5em] py-[0.06em] rounded-full transition-all duration-200 ease-in-out"
          >{{ itemsQuantityInBag }}</span
        >
      </button>
    </Transition>

    <Bag :bag="bag" :isBagActive="isBagActive" :toggleBag="toggleBag" />
  </header>
</template>
