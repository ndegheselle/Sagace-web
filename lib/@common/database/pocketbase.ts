import PocketBase from "pocketbase";
import type { TypedPocketBase } from "./types.g.ts";

let pb: TypedPocketBase | null = null;

export function initPocketBase(url: string) : TypedPocketBase {
    if (pb) return pb; // singleton guard

    pb = new PocketBase(url) as TypedPocketBase;
    return pb;
}

export function usePocketBase() {
    if (!pb) {
        throw new Error(
            "PocketBase has not been initialized. Call initPocketBase() first.",
        );
    }

    return {
        pb,
    };
}
