import { usePocketBase } from "@common/database/pocketbase.ts";
import type { CompaniesRecord } from "@common/database/types.g";

export function getLogo(record: CompaniesRecord): string
{
    if (!record.logo) return '';
    const { pb } = usePocketBase();
    return pb.files.getURL(record, record.logo);
}
