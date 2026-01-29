import { usePocketBase } from '@/database/pocketbase.ts';
import { Collections, type CompaniesRecord } from "@/database/types.g.ts";

const { pb } = usePocketBase();
const collection = pb.collection(Collections.Companies);

async function update(company: CompaniesRecord) {
    await collection.update(company.id, company);
}

export const companies = {
    update
}