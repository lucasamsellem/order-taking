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
    ref="modalRef"
    @click="(e) => closeOnOutsideClick(e, modalRef)"
    :class="`${isLoading ? 'bg-transparent overflow-hidden' : ''} max-[800px]:w-[85vw]`"
  >
    <p v-if="isLoading" class="flex justify-center">
      <Loader />
    </p>
    <div v-else class="text-xl text-center font-[400]">
      <CloseBtn @click="closeModal(modalRef)" class="text-[1.6rem] p-[0.4rem] text-zinc-600" />
      <div class="space-y-10">
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
