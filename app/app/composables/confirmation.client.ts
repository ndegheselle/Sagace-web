import { ref } from 'vue';

const dialogEl = ref<HTMLDialogElement | null>(null);

const title = ref('');
const message = ref('');
const icon = ref('');
let resolver: ((value: boolean) => void) | null = null;

export function useConfirmation() {

  function registerDialog(el: HTMLDialogElement) {
    dialogEl.value = el;
  }

  function show(t: string, m: string, i?: string): Promise<boolean> {
    console.log(i);
    title.value = t;
    message.value = m;
    icon.value = i || '';

    return new Promise<boolean>((resolve) => {
      resolver = resolve;
      dialogEl.value?.showModal();      // <-- directly open the modal here
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
    dialogEl.value?.close();
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