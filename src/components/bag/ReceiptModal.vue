<script setup lang="ts">
import { defineProps, ref } from 'vue';
import CloseBtn from '../buttons/CloseBtn.vue';
import Loader from '../Loader.vue';
import { closeModal, openModal, closeOnOutsideClick } from '../../utils/triggerModal';

defineProps<{
  totalPrice: number;
  location: string;
  isLoading: boolean;
}>();

// Modal opening and closing
const modalRef = ref<HTMLDialogElement | null>(null);
const emit = defineEmits(['openReceiptModal']);
const openReceiptModal = () => {
  openModal(modalRef.value);
  emit('openReceiptModal');
};
defineExpose({ openReceiptModal });

// Date and time
const date = new Date().toLocaleDateString();
const time = new Date().toLocaleTimeString('default', {
  hour: '2-digit',
  minute: '2-digit',
});
</script>

<template>
  <dialog
    @click="(e) => closeOnOutsideClick(e, modalRef)"
    ref="modalRef"
    class="top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[999] rounded-lg shadow-lg max-[800px]:w-[85vw]"
  >
    <CloseBtn @click="closeModal(modalRef)" class="text-[1.6rem] p-[0.4rem] text-zinc-600" />
    <div class="p-8 text-xl text-center font-[400]">
      <p v-if="isLoading" class="flex justify-center">
        <Loader />
      </p>
      <div v-else class="space-y-10">
        <p>
          ✔️ Order placed on: <strong>{{ date }}</strong> at <strong>{{ time }}</strong>
          <span v-if="location">
            in <strong>{{ location }}</strong></span
          >
        </p>
        <p>
          Total: <strong>{{ totalPrice }}€</strong>
        </p>
        <div class="border-t-1 pt-10 text-5xl space-x-10">
          <ion-icon name="card-outline" />
          <ion-icon name="logo-paypal" />
          <ion-icon name="id-card-outline" />
        </div>
        <p v-if="!location" class="text-[1rem] italic">⚠️ Failed to retrieve your location</p>
      </div>
    </div>
  </dialog>
</template>
