import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './types.g.ts';

let pb: TypedPocketBase | null;
export function initDatabase(url: string) {
    if (!pb) {
        pb = new PocketBase(url) as TypedPocketBase;
    }
}

export function usePocketBase() {
    function getPb(): TypedPocketBase {
        if (!pb)
            throw new Error("PocketBase is not initialized. Call init(url) first.");
        return pb;
    }

    return {
        pb: getPb(),
    }
}