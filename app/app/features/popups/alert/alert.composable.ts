import { ref } from 'vue';

export enum EnumAlertType {
    Info,
    Success,
    Error,
    Warning,
}

class Alert {
    id: number;
    message: string;
    type: EnumAlertType;

    constructor(id: number, message: string, type: EnumAlertType) {
        this.id = id;
        this.message = message;
        this.type = type;
    }
}

const alerts = ref<Alert[]>([]);

export function useAlert() {

    function close(id: number) {
        alerts.value = alerts.value.filter(t => t.id !== id);
    }

    function push(type: EnumAlertType, message: string) {
        const id = Date.now()
        alerts.value.push({ id, type, message })
        setTimeout(() => {
            alerts.value = alerts.value.filter(t => t.id !== id)
        }, 3000)
    }

    return {
        alerts,
        close,
        info: (msg: string) => push(EnumAlertType.Info, msg),
        success: (msg: string) => push(EnumAlertType.Success, msg),
        error: (msg: string) => push(EnumAlertType.Error, msg),
        warning: (msg: string) => push(EnumAlertType.Warning, msg)
    }
}