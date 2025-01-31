<script setup lang="ts">
import { computed, ref } from 'vue';
import type { ProductType } from '../../types/Product';
import { roundToTwo } from '../../utils/roundToTwo';
import CloseBtn from '../buttons/CloseBtn.vue';
import ReceiptModal from './ReceiptModal.vue';
import { whereAmI } from '../../api/getPosition';

const props = defineProps<{
  bag: ProductType[];
  isBagActive: boolean;
  toggleBag: () => boolean;
}>();

const modalRef = ref<InstanceType<typeof ReceiptModal> | null>(null);
const isLoading = ref(false);
const location = ref<string>('');

const totalPrice = computed(() => {
  return props.bag.reduce(
    (total, product) => roundToTwo(total + product.price * product.quantity),
    0
  );
});

const removeItemFromBag = (itemIndex: number) => {
  const item = props.bag[itemIndex];
  item.quantity > 1 ? (item.quantity -= 1) : props.bag.splice(itemIndex, 1);
};

// Confirm order and retrieve user's position
const confirmOrder = async () => {
  try {
    isLoading.value = true;
    modalRef.value?.openReceiptModal();
    location.value = (await whereAmI()) ?? '';
  } catch (error) {
    console.log(error);
  } finally {
    props.toggleBag();
    isLoading.value = false;
  }
};
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isBagActive && props.bag.length"
      class="fixed w-[20rem] p-5 text-center text-md z-[999] top-20 right-10 rounded-lg bg-beige shadow space-y-10 max-[800px]:max-w-[85vw] max-[800px]:left-1/2 max-[800px]:-translate-x-1/2 max-[800px]:text-md"
    >
      <ul class="space-y-5">
        <li
          v-for="({ name, price, quantity }, index) in bag"
          class="grid grid-cols-[auto_1rem_1fr_auto] gap-x-5 justify-items-start"
        >
          <CloseBtn @click="removeItemFromBag(index)" class="bg-red-500 rounded-full px-[0.17em]" />
          <span class="text-zinc-500">{{ quantity }}x</span>
          <span class="font-semibold">{{ name }}</span>
          <span class="text-zinc-500">{{ price }}€</span>
        </li>
      </ul>
      <h5 class="text-2xl max-[800px]:text-xl font-semibold">{{ totalPrice }}€</h5>
      <button
        @click="confirmOrder"
        class="bg-[orange] py-1 cursor-pointer text-white font-medium rounded-md w-full"
      >
        Finalize order
      </button>
    </div>
  </Transition>

  <ReceiptModal
    ref="modalRef"
    :isLoading="isLoading"
    :location="location"
    :totalPrice="totalPrice"
  />
</template>
