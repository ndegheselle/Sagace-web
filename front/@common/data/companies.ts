import { usePocketBase } from "@common/database/pocketbase.ts";
import { type CompaniesResponse, Collections } from "@common/database/types.g";

export type CompanyData = CompaniesResponse;

export function getLogo(record: CompanyData): string
{
    if (!record.logo) return '';
    const { pb } = usePocketBase();
    return pb.files.getURL(record, record.logo);
}

async function update(record: CompanyData) : Promise<CompanyData>
{
    const { pb } = usePocketBase();
    const collection = pb.collection(Collections.Companies);
    return await collection.update(record.id, record);
}

export const companies = {
    update
}