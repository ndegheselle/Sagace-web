import { ref, type Ref } from 'vue';
import { Deferred } from '@sagace/common';

export function useDeferredModal(dialogRef?: Ref<HTMLDialogElement | null>) {
    const internalDialogRef = dialogRef || ref<HTMLDialogElement | null>(null);
    let deferred: Deferred<boolean> | null = null;

    function show(): Promise<boolean> {
        deferred = new Deferred<boolean>();
        internalDialogRef.value?.showModal();
        return deferred.promise;
    }

    function confirm() {
        internalDialogRef.value?.close();
        deferred?.resolve(true);
        deferred = null;
    }

    function cancel() {
        internalDialogRef.value?.close();
        deferred?.resolve(false);
        deferred = null;
    }

    return {
        dialogRef: internalDialogRef,
        show,
        confirm,
        cancel
    }
}