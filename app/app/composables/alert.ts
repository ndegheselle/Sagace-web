import { ref } from 'vue';

export enum EnumPopupType {
    Neutral,
    Info,
    Success,
    Error,
    Warning,
}

class Alert {
    id: number;
    message: string;
    type: EnumPopupType;

    constructor(id: number, message: string, type: EnumPopupType) {
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

    function push(type: EnumPopupType, message: string) {
        const id = Date.now()
        alerts.value.push({ id, type, message })
        setTimeout(() => {
            alerts.value = alerts.value.filter(t => t.id !== id)
        }, 3000)
    }

    return {
        alerts,
        close,
        info: (msg: string) => push(EnumPopupType.Info, msg),
        success: (msg: string) => push(EnumPopupType.Success, msg),
        error: (msg: string) => push(EnumPopupType.Error, msg),
        warning: (msg: string) => push(EnumPopupType.Warning, msg)
    }
}