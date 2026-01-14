export default class Deferred {
    constructor() {
        let resolve;
        let reject;
        this.promise = new Promise((res, rej) => {
            resolve = res;
            reject = rej;
        });
        this.resolve = resolve;
        this.reject = reject;
    }
}
;
