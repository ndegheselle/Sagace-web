import { ref } from 'vue';

/**
 * Enum for type of alert
 * @readonly
 * @enum {number}
 */
const AlertType = {
    Neutral:    1,
    Info:       2,
    Success:    3,
    Error:      4,
    Warning:    5,
};

export class Alert {
    /**
     * @param {number} id 
     * @param {string} message 
     * @param {AlertType} type
     */
    constructor(id, message, type) {
        this.id = id;
        this.message = message;
        this.type = type;
    }
}

const alerts = ref([]);

const ALERT_DEFAULT_DELAY = 3000;
export function useAlert() {

    /**
     * Close alert by id
     * @param {number} id 
     */
    function close(id) {
        alerts.value = alerts.value.filter(t => t.id !== id);
    }

    /**
     * Add new alert
     * @param {AlertType} type 
     * @param {string} message 
     */
    function push(type, message) {
        const id = Date.now();
        alerts.value.push({ id, type, message });
        setTimeout(() => {
            alerts.value = alerts.value.filter(t => t.id !== id)
        }, ALERT_DEFAULT_DELAY);
    }

    return {
        alerts,
        close,
        /**
         * Add info alert
         * @param {string} msg
         */
        info: (msg) => push(EnumAlertType.Info, msg),
        /**
         * Add success alert
         * @param {string} msg
         */
        success: (msg) => push(EnumAlertType.Success, msg),
        /**
         * Add error alert
         * @param {string} msg
         */
        error: (msg) => push(EnumAlertType.Error, msg),
        /**
         * Add warning alert
         * @param {string} msg
         */
        warning: (msg) => push(EnumAlertType.Warning, msg)
    }
}