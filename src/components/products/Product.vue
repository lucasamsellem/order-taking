<script setup lang="ts">
import { computed, defineProps, ref } from 'vue';
import formatImgPath from '../../utils/formatImgPath';
import menus from '../../data/menuData';
import CloseBtn from '../buttons/CloseBtn.vue';
import { closeModal, openModal, closeOnOutsideClick } from '../../utils/triggerModal';

const props = defineProps<{
  name: string;
  type: string;
  price: number;
}>();

// Add selected products to bag
const productQuantity = ref(1);
const emit = defineEmits(['addToBag']);
const addProductToBag = () => {
  if (productQuantity.value <= 0) {
    productQuantity.value = 1;
  } else {
    emit('addToBag', {
      name: props.name,
      price: props.price,
      quantity: productQuantity.value,
    });
  }
};

// Display product recipe
const recipe = computed(() => {
  return (
    menus.flatMap((menu) => menu.products).find((product) => product.name === props.name)?.recipe ||
    null
  );
});

// Modal
const modalRef = ref<HTMLDialogElement | null>(null);
const openRecipeModal = () => recipe.value && openModal(modalRef.value);
</script>

<template>
  <li class="flex flex-col items-center text-center gap-y-8 bg-beige rounded-lg p-6">
    <figure>
      <figcaption class="font-semibold mb-5 text-2xl">
        {{ name }}
      </figcaption>
      <button @click="openRecipeModal" :class="`${recipe ? 'cursor-pointer' : ''}`">
        <img
          class="max-h-[10rem] max-w-[90%] shadow-animation transition-all duration-200"
          :src="`/images/${type}/${formatImgPath(name)}.webp`"
          :alt="`${name} image`"
        />
      </button>
    </figure>

    <dialog
      @click="(e) => closeOnOutsideClick(e, modalRef)"
      ref="modalRef"
      class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] border-none rounded-lg w-[80vw] shadow-lg max-[800px]:h-[80vh]"
    >
      <CloseBtn @click="closeModal(modalRef)" class="text-[1.6rem] p-[0.4rem] text-zinc-600" />
      <div class="p-8 text-2xl rounded-lg leading-6 text-center">
        <ul class="flex justify-between gap-16 max-[800px]:flex-col">
          <li v-for="ingredient in recipe" :key="ingredient">
            <figure class="grid justify-items-center gap-6 max-w-[18rem]">
              <img
                class="max-h-[6rem] shadow-animation transition-all duration-200"
                :src="`/images/ingredients/${formatImgPath(ingredient)}.webp`"
                :alt="`${ingredient} image`"
              />
              <figcaption class="text-[1.2rem] text-gray-600">
                {{ ingredient }}
              </figcaption>
            </figure>
          </li>
        </ul>
      </div>
    </dialog>

    <h4 class="text-2xl">{{ price }}€</h4>

    <form @submit.prevent name="product-quantity" class="flex gap-x-2 items-center">
      <button
        class="text-2xl flex items-center py-2 px-3 bg-[orange] rounded-md text-white cursor-pointer inset-shadow hover:shadow transition-all duration-200"
        type="submit"
        @click="addProductToBag"
      >
        <ion-icon name="bag-check-outline" />
      </button>
      <input
        class="bg-white rounded-md p-2 max-w-14 border-none shadow-sm outline-[orange]"
        type="number"
        value="1"
        min="1"
        v-model.number="productQuantity"
      />
    </form>
  </li>
</template>
