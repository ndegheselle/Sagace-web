import { usePocketBase } from "@common/database/pocketbase.ts";
import { type CompaniesRecord, Collections } from "@common/database/types.g";

export function getLogo(record: CompaniesRecord): string
{
    if (!record.logo) return '';
    const { pb } = usePocketBase();
    return pb.files.getURL(record, record.logo);
}

async function update(record: CompaniesRecord) : Promise<CompaniesRecord>
{
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Companies);
    return await collection.update(record.id, record);
}

export const companies = {
    update
}