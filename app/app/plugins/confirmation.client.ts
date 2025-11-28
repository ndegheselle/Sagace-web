import { defineNuxtPlugin } from '#app';

export default defineNuxtPlugin(() => {
  const confirmation = useConfirmation();

  return {
    provide: {
      confirmation,
    },
  };
});