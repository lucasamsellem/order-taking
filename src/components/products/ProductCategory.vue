<script setup lang="ts">
import { defineProps } from 'vue';

defineProps<{
  category: string;
  id: string;
}>();
</script>

<template>
  <section class="my-[10rem] max-[800px]:scroll-mt-32 max-[800px]:my-[6rem]" :id="id">
    <h2 class="border-b-1 pb-4 font-bold text-4xl mb-10">
      {{ category }}
    </h2>
    <ul class="grid sm:grid-cols-3 gap-6">
      <slot></slot>
    </ul>
  </section>
</template>
