import { ref } from 'vue';

function useToggle(init = false) {
  const state = ref(init);

  const toggle = () => (state.value = !state.value);

  return { state, toggle };
}

export default useToggle;
