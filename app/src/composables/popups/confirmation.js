import { ref } from 'vue';

/**
* Element of the confirmation dialog
* @type {HTMLDialogElement|null}
*/
const dialog = ref(null);

const title = ref('');
const message = ref('');
const icon = ref('');
let resolver: ((value: boolean) => void) | null = null;

export function useConfirmation() {

  /**
   * Register dialog element
   * @param {HTMLDialogElement} el
   */
  function registerDialog(el) {
    dialog.value = el;
  }

  /**
   * 
   * @param {string} t 
   * @param {string} m 
   * @param {?string} i 
   * @returns {Promise<boolean>}
   */
  function show(t, m, i) {
    title.value = t;
    message.value = m;
    icon.value = i || '';

    return new Promise<boolean>((resolve) => {
      resolver = resolve;
      dialog.value?.showModal();      // <-- directly open the modal here
    });
  }

  function confirm() {
    resolver?.(true);
    cleanup();
  }

  function cancel() {
    resolver?.(false);
    cleanup();
  }

  function cleanup() {
    dialog.value?.close();
    resolver = null;
  }

  return {
    registerDialog,
    title,
    message,
    icon,
    show,
    confirm,
    cancel,
  };
}